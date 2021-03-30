import { Component, Input } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';

import { UserWb } from '../../shared/entity/user-wb';
import { Wellbeing } from '../../shared/entity/wellbeing';
import { ItemListService } from '../../service/item-list.service';
import { NotificationService } from '../../service/notification.service';
import { UserService } from '../../service/user.service';
import { ThanksPage } from '../thanks/thanks';
import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';

/**
 * Generated class for the Final page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-final',
  templateUrl: 'final.html',
})
export class FinalPage {
  @Input()
  wellbeing: Wellbeing = { at: undefined, updated: undefined, later: undefined, lucky: undefined, relaxed: undefined, like: undefined } as Wellbeing;
  wellbeings: Wellbeing[];
  private userWbs: UserWb[];
  private userWb: UserWb;
  private day: Date;

  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastController: ToastController,
    private itemListService: ItemListService,
    private notificationService: NotificationService,
    private userService: UserService,
    public translate: TranslateService
  ) {
    let user  = userService.getCurrentUser();
    this.wellbeings = user.quests[0].wbs;
    if (!this.wellbeings) {
      this.wellbeings = [];
    }
    this.userWbs = user.userWbs;
    this.userWb = user.userWbs[this.getWbIndex()];
    this.day = user.day;
    translate.setDefaultLang('en');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Final');
  }

  /**
   * Check if at least one wellbeing questionnaire has been answered
   */
  isWellbeing(): boolean {
    // if no userwb is marked as "later", consider question as answered
    return this.getWbIndex() == -1 || this.wellbeings.findIndex(wb => wb.updated != undefined) > -1;
  }

  finished() {
    if (!this.isWellbeing()) {
      let i = this.getWbIndex();
      let at = this.notificationService.createDate(this.day, this.userWb.wb);
      let dest = this.wellbeings[i];
      if (dest == undefined) {
        dest = new Wellbeing();
      }
      dest.lucky = this.adjust(this.wellbeing.lucky);
      dest.relaxed = this.adjust(this.wellbeing.relaxed);
      dest.like = this.adjust(this.wellbeing.like);
      dest.later = true;
      dest.at = at;
      dest.updated = new Date();
      if (!this.wellbeings[i]) {
        this.wellbeings.push(dest);
      }
      this.userService.setStoredWbs(this.wellbeings);
    }

    let loading = this.loadingCtrl.create({
      content: "Bitte warten..."
    });
    loading.present().then(() => {
      this.itemListService.sendItems(true).then(obs => obs.subscribe(result => {
        this.itemListService.reset().then(() => {
          loading.dismiss();
          this.navCtrl.setRoot(ThanksPage);
        });
      }, error => {
        loading.dismiss();
        console.error(error);

        let sendingerror = '';
        this.translate.get('final.sendingerror').subscribe(value => { sendingerror = value });

        let toast = this.toastController.create({          
          message: sendingerror,
          position: 'middle',
          duration: 5000,
          dismissOnPageChange: true
        });
        toast.present();
      })
    )});
  }

  private getWbIndex(): number {
    return this.userWbs.findIndex(userWb => userWb.later);
  }

  private adjust(answer: number): number {
    if (answer == null || answer == undefined) {
      return -1;
    }
    return answer;
  }

  getWbStartTime(): Date {
    let wbTime: number = this.userWb.wb;
    let date = new Date(this.day);
    date.setHours(Math.floor(wbTime / 100));
    date.setMinutes(wbTime % 100);
    date.setSeconds(0);
    return date;
  }

  getWbEndTime(): Date {
    let date = this.getWbStartTime();
    date.setMinutes(date.getMinutes() + 9);
    return date;
  }

  getMainActivity(): String {
    let wbTime: Date = this.getWbStartTime();
    for (let item of this.itemListService.getCurrentItems()) {
      if (moment(item.start).isSame(wbTime)) {
        return item.primaryActivity;
      }
    }
    return "";
  }

  back() {
    this.navCtrl.pop();
  }

}
