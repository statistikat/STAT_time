import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';

import * as moment from 'moment';

/**
 * Generated class for the EndTimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-end-time',
  templateUrl: 'end-time.html',
})
export class EndTimePage {
  @Input() activity: string;
  @Input() minTime: Date;
  @Input() endTime: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private platform: Platform,
  ) {
    this.activity = navParams.get('activity');
    this.minTime = navParams.get('to');
    this.endTime = moment(this.minTime).format('HH:mm');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EndTimePage');
  }

  isAndroid() {
    return this.platform.is('android');
  }

  close() {
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss({
      'endTime': this.endTime
    });
  }

}
