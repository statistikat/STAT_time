import { UserWb } from './../shared/entity/user-wb';
import { AuthService } from './auth.service';
import { LoginData } from './../shared/entity/login-data';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';

import { Observable } from 'rxjs';

import { RestService } from './rest.service'
import { User } from '../shared/entity/user';
import { Quest } from '../shared/entity/quest';
import { Wellbeing } from '../shared/entity/wellbeing';

import * as moment from 'moment';

const Rest_getUser = '/open/getUserWithData';
const KEY_USER = 'user';
const KEY_LOGIN_DATA = 'loginData';
const KEY_WELLBEINGS = 'wellbeings';

@Injectable()
export class UserService extends RestService {
  public currentUser: User;
  public loginData: LoginData;
  private version: string;
  private device: string;

  constructor(platform: Platform,
    private storage: Storage,
    http: Http,
    authService: AuthService,
    appVersion: AppVersion,
    device: Device
  ) {
    super(http, authService, platform);
    this.platform.ready().then((readySource) => {
      if (readySource == 'cordova') {
        appVersion.getVersionNumber().then((version) => this.version = version);
      } else {
        this.version = readySource;
      }
      this.device = '';
      if (device.platform) {
        this.device = device.platform;
      }
      if (device.version) {
        this.device += ' ' + device.version;
      }
      if (device.manufacturer) {
        this.device += ' ' + device.manufacturer;
      }
      if (device.model) {
        this.device +=' ' + device.model;
      }
    });
  }

  // getUser(id: string, password: string): Observable<User> {
  getUser(loginData: LoginData): Observable<User> {

    if (this.isMockService()) {
       return Observable.of(this.createDummyUser(loginData.userid));
    }
    loginData.version = (this.version + (this.device ?  '/' + this.device : '')).trim();
    loginData.log = this.screenSize();
    return this.sendPost(Rest_getUser, loginData, User);

  }

  screenSize(): string {
    return this.platform.width() + 'x' + this.platform.height();
  }

  protected createDummyUser(id: string): User {
    let user = new User();
    user.username = id;
    user.day = new Date();

    // user.wellbeing = new Array<number>(-1, 910, 1230, 1650);

    user.userWbs = new Array<UserWb>();

    let wb1: UserWb = new UserWb();
    wb1.wb = -1;
    wb1.later = false;
    let wb2: UserWb = new UserWb();
    wb2.wb = 910;
    wb2.later = false;
    let wb3: UserWb = new UserWb();
    wb3.wb = 1230;
    wb3.later = true;
    let wb4: UserWb = new UserWb();
    wb4.wb = 1650;
    wb4.later = false;

    user.userWbs.push(wb1);
    user.userWbs.push(wb2);
    user.userWbs.push(wb3);
    user.userWbs.push(wb4);

    user.config = {
      "lookupChar": 3,          // number of chars entered to trigger lookup
      "lookupType": 0,          // 0=substring, 1=exact, 2=phonetic
      "whereBoolean": false,    // at home, yes or no
      "copyRestricted": false   // copy main activity only
    };
    user.quests = new Array<Quest>({questNo: 1, finished: false, slots: [], wbs: []} as Quest);
    user.paradata = {};
    return user;
  }

  setStoredUser(user: User): Promise<User> {
    return this.storage.set(KEY_USER, user);
  }

  getStoredUser(): Promise<User> {
    let promise = this.storage.get(KEY_USER);
    promise.then(user => this.currentUser = user);
    return promise;
  }

  removeStoredUser(): Promise<User> {
    return this.storage.remove(KEY_USER);
  }

  setStoredLoginData(loginData: LoginData): Promise<LoginData> {
    return this.storage.set(KEY_LOGIN_DATA, loginData);
  }

  getStoredLoginData(): Promise<LoginData> {
    let promise = this.storage.get(KEY_LOGIN_DATA);
    promise.then(loginData => this.loginData = loginData);
    return promise;
  }

  removeStoredLoginData(): Promise<LoginData> {
    return this.storage.remove(KEY_LOGIN_DATA);
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  currentUserTooEarly(): boolean {
    return moment().isBefore(moment(this.currentUser.day));
  }

  setStoredWbs(wbs: Wellbeing[]): Promise<Wellbeing[]> {
    return this.storage.set(KEY_WELLBEINGS, wbs);
  }

  getStoredWbs(): Promise<Wellbeing[]> {
    let promise = this.storage.get(KEY_WELLBEINGS);
    promise.then(wbs => this.currentUser.quests[0].wbs = wbs);
    return promise;
  }

  removeStoredWbs(): Promise<Wellbeing[]> {
    return this.storage.remove(KEY_WELLBEINGS);
  }

}
