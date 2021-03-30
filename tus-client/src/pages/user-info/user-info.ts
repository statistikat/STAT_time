import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';

import { Login } from '../login/login';
import { User } from '../../shared/entity/user';
import { ItemListService } from '../../service/item-list.service';
import { UserService } from '../../service/user.service';
import { VERSION } from '../../assets/version';

/**
 * Generated class for the UserInfo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfo {
  version = VERSION;
  private user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    private device: Device,
    public itemListService: ItemListService,
    public userService: UserService
  ) {
      this.user = userService.getCurrentUser();
      this.plt.ready().then((readySource) => {
        console.log('Platform ready from', readySource);
        // Platform now ready, execute any required native code
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfo');
  }

  wellbeingInfo(): string {
    let times = new Array<string>();
    for (let slot of this.user.userWbs.map(userWb => userWb.wb)) {
      let hour = Math.floor(slot / 100);
      let minutes = slot - hour * 100;
      times.push(hour + ":" + ("0" + minutes).slice(-2));
    }
    return times.join(", ");
  }

  model(): string {
    return this.device.model;
  }

  platform(): string {
    return this.device.platform;
  }

  screenSize(): string {
    let height = this.plt.height();
    let width = this.plt.width();
    return width + " x " + height;
  }

  orientation(): string {
    if (this.plt.isPortrait()) {
      return "portrait";
    }
    if (this.plt.isLandscape()) {
      return "landscape";
    }
    return "unknown";
  }

  reset() {
    this.itemListService.reset().then(() => {
      this.navCtrl.setRoot(Login);
    });
  }

}
