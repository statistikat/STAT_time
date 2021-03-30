import { Wellbeing } from './../../shared/entity/wellbeing';
import { ActivityService } from './../../service/activity.service';
import { AuthService } from './../../service/auth.service';
import { LoginData } from './../../shared/entity/login-data';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController, Platform, ToastController } from 'ionic-angular';

import { ListPage } from '../list/list';
import { ThanksPage } from '../thanks/thanks';
import { ItemListService } from '../../service/item-list.service';
import { UserService } from '../../service/user.service';
import { Quest } from '../../shared/entity/quest';
import { User } from '../../shared/entity/user';

import * as CryptoJS from 'crypto-js/crypto-js.js';
import { TranslateService } from '@ngx-translate/core';
import { VERSION } from '../../assets/version';






/**
 * Login page.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  version = VERSION;
  private loginData: FormGroup;
  private user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private itemListService: ItemListService,
    private userService: UserService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private platform: Platform,
    private authService: AuthService,
    private activityService: ActivityService,
    private translate: TranslateService
  ) {
    this.loginData = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    translate.setDefaultLang('en');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login() {
    if (this.loginData.value.password.length == 0) {
      this.user = undefined;
      this.loginError();
    }
    else {
      let loginData: LoginData = new LoginData();
      loginData.userid = this.loginData.value.username.toLowerCase();

      loginData.password = CryptoJS.SHA256(this.loginData.value.password).toString();
      //loginData.password = bcrypt.hash(this.loginData.value.password).toString();
      //loginData.password = (this.loginData.value.password).toString();

      let pleasewait = '';
      this.translate.get('common.wait').subscribe(value => { pleasewait = value });

      let loading = this.loadingController.create({
        content: pleasewait
      });
      loading.present().then(() => {
        this.userService.getUser(loginData).subscribe(user => {
          loading.dismiss();
          if (user == undefined || user.username == undefined) {
            this.loginError();
          } else {
            // user.wellbeing = new Array<number>(-1, 910, 1230, 1650);
            user.config = {
              "lookupChar": 3,          // number of chars entered to trigger lookup
              "lookupType": 0,          // 0=substring, 1=exact, 2=phonetic
              "whereBoolean": false,    // at home, yes or no
              "copyRestricted": false   // copy main activity only
            };
            user.paradata = {};

            if (!user.quests) {
              user.quests = [];
            }
            if (user.quests.length == 0) {
              user.quests.push(new Quest());
            }
            let quest = user.quests[0];
            if (!quest.wbs) {
              quest.wbs = new Array<Wellbeing>();
            }
            this.user = user;
            this.userService.getStoredUser().then((storedUser) => {
              if (storedUser && user.username != storedUser.username) {
                this.itemListService.reset().then(() => {
                  this.proceed(loginData, user, quest)
                });
              } else {
                this.proceed(loginData, user, quest);
              }
            })
          }
        }, error => {
          loading.dismiss();
          console.error(error);
          this.loginError(error);
        });
      });
    }
  }

  private proceed(loginData: LoginData, user: User, quest: Quest) {
      this.userService.setStoredUser(this.user);
      this.userService.setStoredLoginData(loginData);
      this.userService.currentUser = this.user;
      this.authService.user = this.user;

      let tooEarly = this.userService.currentUserTooEarly();
      if (quest.finished || tooEarly) {
        this.navCtrl.setRoot(ThanksPage, {user: user, tooEarly: tooEarly });
      } else {
        this.navCtrl.setRoot(ListPage);
      }
      this.activityService.loadAllActivities(loginData).subscribe(activities => {
          this.activityService.setStoredActivities(activities);
      })
  }

  private loginError(text?: string): void {
    let errorlogin1 = '';
    this.translate.get('common.error').subscribe(value => { errorlogin1 = value });
    let errorlogin2 = '';
    this.translate.get('login.failed').subscribe(value => { errorlogin2 = value });
    
    let toast = this.toastController.create({
      
      //TODO: change internationalization
      //message: text ? 'Fehler: ' + text : 'Anmeldung fehlgeschlagen.',
      message: text ? errorlogin1 + text : errorlogin2,
      
      duration: 5000,
      dismissOnPageChange: true
    });
    toast.present();
  }

  isAndroid(): boolean {
    return this.platform.is('android');
  }

}
