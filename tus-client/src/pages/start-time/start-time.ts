import { Component, Input, ViewChild } from '@angular/core';
import { DateTime, NavController, NavParams, Platform, ViewController } from 'ionic-angular';

import * as moment from 'moment';
import 'moment/locale/de-at';

/**
 * Generated class for the StartTimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-start-time',
  templateUrl: 'start-time.html',
})
export class StartTimePage {
  @Input() startTime: string;
  @Input() dayString: string;
  @ViewChild('dateTime') dateTime: DateTime;
  day: Date;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private platform: Platform
  ) {
    // moment.updateLocale('de-AT', {
    //   weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),      
    //   longDateFormat : {
    //       LT: 'HH:mm',
    //       LTS: 'HH:mm:ss',
    //       L : 'dddd, D.M.',
    //       LL : 'D. MMMM YYYY',
    //       LLL : 'D. MMMM YYYY HH:mm',
    //       LLLL : 'dddd, D. MMMM YYYY HH:mm'
    //   },
    //   calendar: {
    //     lastDay : '[gestern]',
    //     sameDay : '[heute]',
    //     nextDay : '[am] L',
    //     lastWeek : '[am] L',
    //     nextWeek : '[am] L',
    //     sameElse : '[am] L'
    //   }
    // },
    moment.updateLocale('en-EN', {      
      weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
      longDateFormat : {
          LT: 'HH:mm',
          LTS: 'HH:mm:ss',
          L : 'dddd, D.M.',
          LL : 'D. MMMM YYYY',
          LLL : 'D. MMMM YYYY HH:mm',
          LLLL : 'dddd, D. MMMM YYYY HH:mm'
      },
      calendar: {
        lastDay : '[yesterday]',
        sameDay : '[today]',
        nextDay : '[on] L',
        lastWeek : '[on] L',
        nextWeek : '[on] L',
        sameElse : '[on] L'
      }
    }
    );
    //moment.locale('de-AT');
    moment.locale('en-EN');
    this.dayString = moment(navParams.get('day')).calendar();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartTimePage');
  }

  isAndroid() {
    return this.platform.is('android');
  }

  isCordova() {
    return this.platform.is('cordova');
  }

  close() {
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss({
      'startTime': this.startTime
    });
  }

}
