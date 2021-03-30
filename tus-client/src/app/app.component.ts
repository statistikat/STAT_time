import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { UserInfo } from '../pages/user-info/user-info';
import { WellbeingNow } from '../pages/wellbeing-now/wellbeing-now';
import { UserService } from '../service/user.service';
import { TranslateService } from "@ngx-translate/core";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make LoginPage the root (or first) page
  rootPage: any;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private userService: UserService,
    private translate: TranslateService,
  ) {

    // set our app's pages
    let entrylist = '';
    this.translate.get('menu.entrylist').subscribe(value => { entrylist = value });
    let information = '';
    this.translate.get('menu.information').subscribe(value => { information = value });
    let howareyou = '';
    this.translate.get('menu.howareyou').subscribe(value => { howareyou = value });


    this.pages = [
      // { title: 'Eintragsliste', component: ListPage },  
      // { title: 'Information', component: UserInfo },
      // { title: 'Wie geht es Ihnen?', component: WellbeingNow }

      
      { title: entrylist, component: ListPage },
      
      { title: information, component: UserInfo },
      { title: howareyou, component: WellbeingNow }      


    ];

    translate.setDefaultLang('en');
    translate.use('en');

    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {

      // check if user is already logged in
      this.userService.getStoredUser().then(user => {
        if (user == undefined
          || user.quests && user.quests[0].finished
          || this.userService.currentUserTooEarly()
        ) {
          this.rootPage = Login;
        } else {
          this.rootPage = ListPage;
        }
      });

      // platform-specific UI
      this.statusBar.styleDefault();
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString("#b0063d");
      }

      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  isDebug(): boolean {
    return !this.platform.is('cordova');
  }
}
