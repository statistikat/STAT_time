import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Login } from '../login/login';
import { User } from '../../shared/entity/user';

import * as moment from 'moment';
import 'moment/locale/de-at';

/**
 * Generated class for the ThanksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-thanks',
  templateUrl: 'thanks.html',
})
export class ThanksPage {
  private finished: Date;
  private day: Date;
  private tooEarly: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
      let user: User = navParams.get('user');
      this.tooEarly = navParams.get('tooEarly');
      if (user) {
        this.day = user.day;
        let quest = user.quests[0];
        if (quest && quest.finished) {
          this.finished = quest.updated;
        }
      }
      moment.locale('de-AT');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThanksPage');
  }

  close() {
    this.navCtrl.setRoot(Login);
  }

}
