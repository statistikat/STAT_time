import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Device } from '@ionic-native/device';
import { Vibration } from '@ionic-native/vibration';
import { AppVersion } from '@ionic-native/app-version';

import { MomentModule } from 'angular2-moment';
import { IonicApp, IonicModule, IonicErrorHandler, ToastController } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ItemListService } from '../service/item-list.service';
import { LogService } from '../service/log.service';
import { UserService } from '../service/user.service';
import { ActivityService } from '../service/activity.service';
import { AuthService } from './../service/auth.service';
import { NotificationService } from '../service/notification.service';
import { WellbeingService } from '../service/wellbeing.service';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { QuestionWherePage } from '../pages/question-where/question-where';
import { QuestionWhoPage } from '../pages/question-who/question-who';
import { UserInfo } from '../pages/user-info/user-info';
import { ActivityPage } from '../pages/activity/activity';
import { WellbeingNow } from '../pages/wellbeing-now/wellbeing-now';
import { EndTimePage } from '../pages/end-time/end-time';
import { FinalPage } from '../pages/final/final';
import { StartTimePage } from '../pages/start-time/start-time';
import { ThanksPage } from '../pages/thanks/thanks';
import { QuestionRange } from '../components/question-range/question-range';
import { WellbeingQuestions } from '../components/wellbeing-questions/wellbeing-questions';


import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    Login,
    QuestionWherePage,
    QuestionWhoPage,
    UserInfo,
    ActivityPage,
    WellbeingNow,
    EndTimePage,
    FinalPage,
    StartTimePage,
    ThanksPage,
    QuestionRange,
    WellbeingQuestions
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MomentModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    Login,
    QuestionWherePage,
    QuestionWhoPage,
    UserInfo,
    ActivityPage,
    WellbeingNow,
    EndTimePage,
    FinalPage,
    StartTimePage,
    ThanksPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: "de-AT"},
    AuthService,
    ItemListService,
    LogService,
    UserService,
    ActivityService,
    NotificationService,
    WellbeingService,
    SplashScreen,
    StatusBar,
    LocalNotifications,
    FormBuilder,
    ToastController,
    Device,
    Vibration,
    AppVersion
  ]
})
export class AppModule {}
