import { Component, OnInit } from '@angular/core';
import { AlertController, Loading, LoadingController, ModalController, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

import * as moment from 'moment';

import { Item } from '../../shared/entity/item';
import { Quest } from '../../shared/entity/quest';
import { User } from '../../shared/entity/user';
import { Wellbeing } from '../../shared/entity/wellbeing';
import { ItemListService } from '../../service/item-list.service';
import { LogService } from '../../service/log.service';
import { NotificationService } from '../../service/notification.service';
import { UserService } from '../../service/user.service';
import { WellbeingService } from '../../service/wellbeing.service';
import { ItemDetailsPage } from '../item-details/item-details';
import { FinalPage } from '../final/final';
import { StartTimePage } from '../start-time/start-time';




@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
  

})
export class ListPage implements OnInit {
  items: Array<Item>;
  loading: Loading;
  startTime = '05:00';
  user: User;
  private progressItemId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private platform: Platform,
    private toastCtrl: ToastController,
    private itemListService: ItemListService,
    private logService: LogService,
    private notificationService: NotificationService,
    private userService: UserService,
    private wellbeingService: WellbeingService,   
    private translate: TranslateService)
  {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    console.log("ngOnInit ListPage");
    this.user = this.userService.getCurrentUser();
    let items = this.itemListService.getCurrentItems();
    if (items != undefined) {
      this.items = items;
      this.initWellbeingFrom(this.user.quests[0]);
      return;
    }

    let pleasewait = '';
    this.translate.get('common.wait').subscribe(value => { pleasewait = value });

    this.loading = this.loadingCtrl.create({
      content: pleasewait
    });
    this.loading.present().then(() => {
      this.notificationService.loadScheduledNotifications().then(() => {
        this.itemListService.hasItems().then(hasItems => {
          let quest = this.user.quests[0];
          if (hasItems) {
            this.items = this.itemListService.getCurrentItems();
            this.initWellbeingFrom(quest).then(wbs => {
              this.loading.dismiss();
              this.showWellbeingOnEnter();
            });
          } else {
            this.wellbeingService.setWellbeings(quest.wbs);
            this.loading.dismiss();
            this.selectStartTime();
          }
        });
      });
    });
  }

  private initWellbeingFrom(quest: Quest): Promise<Wellbeing[]> {
    return this.wellbeingService.initWellbeingFrom(quest);
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter ListPage")
    this.items = this.itemListService.getCurrentItems();
    if (this.items) {
      this.itemListService.storeItems();
    }
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter ListPage");
    this.itemListService.clearSelection();
    this.showWellbeingOnEnter();
  }

  private showWellbeingOnEnter() {
    let wbTimeId: number = this.navParams.get('wbTimeId');
    if (wbTimeId == undefined) {
      this.showWellbeingIfTriggered();
    } else if (this.notificationService.isUnprocessedTimeId(wbTimeId)) {
      this.doShowWellbeing(wbTimeId);
    }
  }

  private showWellbeingIfTriggered() {
    let timeId = this.notificationService.getActiveTimeId();
    if (timeId != undefined) {
      this.doShowWellbeing(timeId);
    }
  }

  private doShowWellbeing(timeId: number) {
    this.wellbeingService.doShowWellbeing(timeId, () => {
        this.navCtrl.setRoot(ListPage);
        this.progressItemId = undefined;
    });
  }

  private selectStartTime() {
    let startTimeModal = this.modalCtrl.create(StartTimePage, {day: this.user.day},
      { enableBackdropDismiss: false});
    startTimeModal.onDidDismiss( data => {
      if (data != undefined && data.startTime != undefined) {
        this.startTime = data.startTime;
      }
      let pleasewait = '';
      this.translate.get('common.wait').subscribe(value => { pleasewait = value });
      this.loading = this.loadingCtrl.create({
        content: pleasewait        
      });
      this.loading.present().then(() => {
        let hours = Number(this.startTime.substring(0, 2));
        let minutes = Number(this.startTime.substring(3));
        this.itemListService.getItems(this.user.day, hours, minutes).then(items => {
          this.items = items;
          this.loading.dismiss();
        });
        this.scheduleNotifications();
      });
    });
    startTimeModal.present();
  }

  private scheduleNotifications() {
    this.notificationService.scheduleAllWellbeing(this.user.day, this.startTime, this.user.userWbs.map(userWb => userWb.wb));
    this.notificationService.registerCallback((notification) => {
      if (this.notificationService.isUnprocessedTimeId(notification.data)) {
        this.navCtrl.setRoot(ListPage, {wbTimeId: notification.data});
      }
    });
  }

  itemTapped(item: Item) {
    this.progressItemId = item.id;
    this.wellbeingService.showActiveWellbeing(() => {
      this.doItemTapped(item);
    })
  }

  private doItemTapped(item: Item) {
      if (this.selectedCount() == 0) {
        this.showDetails(item);
      } else {
        this.select(item);
      }
  }

  showDetails(item: Item) {
    let previousItem = this.itemListService.getPreviousItem(item.id);
    this.navCtrl.push(ItemDetailsPage, {
      item: item,
      template: previousItem
    }).then(() => {
      this.showWellbeingIfTriggered();
      this.progressItemId = undefined;
    });
  }

  icon(item: Item): string {
    if (this.itemListService.isValid(item)) {
      return "checkmark";
    } else if (!this.itemListService.isEmpty(item)) {
      return "warning";
    }
    return undefined;
  }

  iconColor(item: Item): string {
    if (this.icon(item) == "warning") {
      return "danger";
    }
    return undefined;
  }

  progress(item: Item): boolean {
    return item.id == this.progressItemId;
  }

  dateStr(): string {
    return this.fixWeekday(moment(this.user.day).locale('de-AT').format('dd D.M.'));
  }

  fixWeekday(dateStr: string): string {
    // setting locale does not work reliably
    dateStr = dateStr.replace('Tu', 'Di');
    dateStr = dateStr.replace('We', 'Mi');
    dateStr = dateStr.replace('Th', 'Do');
    dateStr = dateStr.replace('Su', 'So');
    return dateStr;
  }

  done(event) {
    let unanswered = this.itemListService.unansweredEntries();


    let journal1 = '';
    this.translate.get('list.journal1').subscribe(value => { journal1 = value });
    let journal2 = '';
    this.translate.get('list.journal2').subscribe(value => { journal2 = value });
    let journal3 = '';
    this.translate.get('list.journal3').subscribe(value => { journal3 = value });

    if (unanswered) {
      this.alertCtrl.create({
        subTitle: '<p>'+journal1+'</p><p>'+ journal2 +'<strong>'
            + unanswered + '</strong>'+ journal3 +'.</p>',        

        buttons: ['Ok']
      }).present();


      let completionprohibited1 = '';
    this.translate.get('list.completionprohibited1').subscribe(value => { completionprohibited1 = value });
    let completionprohibited2 = '';
    this.translate.get('list.completionprohibited2').subscribe(value => { completionprohibited2 = value });

      this.logService.log(completionprohibited1 + unanswered + completionprohibited2).then(() => {
        this.itemListService.storeItems(true);
      });
    } else {
      this.navCtrl.push(FinalPage, {wellbeings: this.wellbeingService.getWellbeings()});
    }
  }

  allowCopy(item: Item): boolean {
    return this.itemListService.allowCopy(item);
  }

  copy(event, item: Item) {
    this.itemListService.copyFromPrevious(item);
  }

  isAndroid() {
    return this.platform.is('android');
  }

  isEmpty(item: Item): boolean {
    return this.itemListService.isEmpty(item);
  }

  nextItem() {
    let item = this.itemListService.getNextItem();
    
    let diarycompleted = '';
    this.translate.get('list.diarycompleted').subscribe(value => { diarycompleted = value });


    
    if (item == undefined) {
      let toast = this.toastCtrl.create({
        message: diarycompleted,
        duration: 900
      });
      toast.present();
    } else {
      this.showDetails(item);
    }
  }

  title(item: Item): string {
    return this.itemListService.title(item);
  }

  start(item: Item): string {
    return this.itemListService.time(item.start);
  }

  ende(item: Item): string {
    return this.itemListService.time(item.ende);
  }

  itemPressed(item: Item) {
    if (this.itemListService.ALLOW_MULTISELECT && this.selectedCount() == 0) {
      item.selected = true;
    }
  }

  select(item: Item) {
    if (item.selected) {
      item.selected = false;
    } else if (this.selectedCount() == 1) {
      this.itemListService.expandSelectionTo(item);
    } else {
      item.selected = true;
    }
    this.progressItemId = undefined;
  }

  selectedCount(): number {
    return this.itemListService.getSelectedCount();
  }

  clearSelection() {
    this.itemListService.clearSelection();
  }
}
