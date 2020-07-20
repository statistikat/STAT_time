import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { NotificationService } from '../../service/notification.service';
import { Wellbeing } from '../../shared/entity/wellbeing';

/**
 * Generated class for the WellbeingNow page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-wellbeing-now',
  templateUrl: 'wellbeing-now.html',
})
export class WellbeingNow {
  wellbeing: Wellbeing = { at: undefined, updated: undefined, later: undefined, lucky: undefined, relaxed: undefined, like: undefined } as Wellbeing;
  private timeId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private notificationService: NotificationService) {
      this.timeId = navParams.get('wbTimeId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WellbeingNow (timeId=' + this.timeId + ')');
    if (this.timeId != undefined) {
      this.notificationService.cancelByTimeId(this.timeId);
    }
  }

  close() {
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss({
      'timeId': this.timeId,
      'wellbeing': this.wellbeing,
    });
  }

  isComplete(): boolean {
    return this.wellbeing.lucky != undefined
      && this.wellbeing.relaxed != undefined
      && this.wellbeing.like != undefined;
  }
}
