import { Injectable } from "@angular/core";
import { ModalController, Platform } from 'ionic-angular';

import { NotificationService } from './notification.service';
import { UserService } from './user.service';
import { WellbeingNow } from '../pages/wellbeing-now/wellbeing-now';
import { Quest } from '../shared/entity/quest';
import { Wellbeing } from '../shared/entity/wellbeing';

@Injectable()
export class WellbeingService {
  private wellbeings: Wellbeing[];

  constructor(
    public modalCtrl: ModalController,
    public platform: Platform,
    private notificationService: NotificationService,
    private userService: UserService
  ) {
  }

  public getWellbeings(): Wellbeing[] {
    return this.wellbeings;
  }

  public setWellbeings(wellbeings: Wellbeing[]) {
    this.wellbeings = wellbeings;
  }

  public showActiveWellbeing(afterWellbeing?: Function) {
    if (this.platform.is('cordova')) {
      this.notificationService.getTriggeredNotificationIds().then((ids) => {
        if (ids != undefined && ids.length > 0) {
          this.notificationService.cancel(ids[0]);
          let timeId = this.notificationService.timeIdForNotificationId(ids[0]);
          this.showWellbeing(timeId, () => {
            if (afterWellbeing != undefined) {
              afterWellbeing.apply(null);
            }
          });
        } else {
          if (afterWellbeing != undefined) {
            afterWellbeing.apply(null);
          }
        }
      });
    } else {
        if (afterWellbeing != undefined) {
          afterWellbeing.apply(null);
        }
    }
  }

  public doShowWellbeing(timeId: number, afterWellbeing?: Function) {
      this.notificationService.setProcessedTimeId(timeId);
      this.notificationService.cancelByTimeId(timeId);
      this.showWellbeing(timeId, afterWellbeing);
  }

  private showWellbeing(timeId: number, afterWellbeing?: Function) {
    let user = this.userService.getCurrentUser();
    let notificationModal = this.modalCtrl.create(WellbeingNow, {wbTimeId: timeId},
      { enableBackdropDismiss: false});
    notificationModal.onDidDismiss( data => {
      if (data && data.timeId >= 0 && data.wellbeing) {
        this.notificationService.cancelByTimeId(timeId);
        this.initWellbeingFrom(user.quests[0]).then((wbs) => {
          this.mergeWellbeing(data.timeId, data.wellbeing);
          if (afterWellbeing != undefined) {
            afterWellbeing.apply(null);
          }
        });
      } else {
        console.warn('WellbeingNow returned no data.');
      }
    });
    notificationModal.present();
  }

  public initWellbeingFrom(quest: Quest): Promise<Wellbeing[]> {
    return this.userService.getStoredWbs().then(wbs => {
      if (wbs && wbs.length > 0) {
        quest.wbs = wbs;
      }
      if (!quest.wbs) {
        quest.wbs = [];
      }
      this.wellbeings = quest.wbs;
      return this.wellbeings;
    });
  }

  private mergeWellbeing(timeId: number, wellbeing: Wellbeing) {
    let user = this.userService.getCurrentUser();
    let userWb = user.userWbs[timeId];
    let dest = this.wellbeings[timeId];
    let at = this.notificationService.createDate(user.day, userWb.wb);
    if (!dest) {
      dest = new Wellbeing();
    }
    dest.lucky = wellbeing.lucky;
    dest.relaxed = wellbeing.relaxed;
    dest.like = wellbeing.like;
    dest.later = false;
    dest.at = at;
    dest.updated = new Date();
    if (!this.wellbeings[timeId]) {
      this.wellbeings.push(dest);
    }
    this.userService.setStoredWbs(this.wellbeings);
  }

}
