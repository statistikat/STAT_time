import { ActivityService } from './../../service/activity.service';
import { Component, Input } from '@angular/core';
import { Gesture, NavController, NavParams, Platform, ViewController, Toast, ToastController } from 'ionic-angular';

import { Item } from '../../shared/entity/item';
import { ActivityPage } from '../activity/activity';
import { QuestionWherePage } from '../question-where/question-where';
import { QuestionWhoPage } from '../question-who/question-who';
import { ItemListService } from '../../service/item-list.service';
import { LogService } from '../../service/log.service';
import { WellbeingService } from '../../service/wellbeing.service';
import {TranslateService} from '@ngx-translate/core';

import * as moment from 'moment';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  private selectedItem: Item;
  private toast: Toast;
  private progressItemId: number;
  private previousValid: boolean;

  @Input() activity: string;
  @Input() minTime: Date;
  @Input() endTime: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private itemListService: ItemListService,
    private logService: LogService,
    private activityService: ActivityService,
    private wellbeingService: WellbeingService,    
    public viewCtrl: ViewController,
    private platform: Platform,
    private translate: TranslateService
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.updatePreviousValid();
    this.activity = navParams.get('activity');
    this.minTime = navParams.get('to');
    this.endTime = moment(this.selectedItem.ende).format('HH:mm');
    translate.setDefaultLang('en');  
  }

  ionViewDidLeave() {
    this.stopProgress();
  }

  allowCopy(): boolean {
    return this.itemListService.allowCopy(this.selectedItem);
  }

  copyTemplate() {
    let template = this.itemListService.copyFromPrevious(this.selectedItem);
    let copytemplate1 = '';
    this.translate.get('item-details.copytemplate1').subscribe(value => { copytemplate1 = value });
    let copytemplate2 = '';
    this.translate.get('item-details.copytemplate2').subscribe(value => { copytemplate2 = value });

    
    this.toast = this.toastCtrl.create({
      message: copytemplate1 + this.itemListService.title(template) + copytemplate2,
      duration: 900
    });
    this.toast.present();
  }

  swipeEvent($event: Gesture) {
    this.nextItem($event.direction);
  }

  buttonBackTapped() {
    this.nextItem("1");
  }

  buttonNextTapped() {
    this.nextItem("2");
  }

  private startProgress() {
    this.progressItemId = this.selectedItem.id;
  }

  private stopProgress() {
    this.progressItemId = undefined;
  }

  progress(): boolean {
    return this.selectedItem.id == this.progressItemId;
  }

  private nextItem(direction: string) {
    this.startProgress();
    this.logValid();
    this.itemListService.storeItems();
    this.wellbeingService.showActiveWellbeing(() => {
      let id = this.selectedItem.id;
      let item = undefined;
      if (direction == "2") {
        item = this.itemListService.getNextVisibleItem(id);
      } else {
        item = this.itemListService.getPreviousVisibleItem(id);
      }
      if (item != undefined) {
        this.itemListService.clearSelection();
        this.selectedItem = item;
        this.updatePreviousValid();
      }
      this.stopProgress();
    });
  }

  private updatePreviousValid() {
    if (this.itemListService.isEmpty(this.selectedItem)) {
      this.previousValid = undefined;
    } else {
      this.previousValid = this.itemListService.isValid(this.selectedItem);
    }
  }

  hasPreviousItem(): boolean {
    return this.itemListService.getPreviousVisibleItem(this.selectedItem.id) != undefined;
  }

  hasNextItem(): boolean {
    return this.itemListService.getNextVisibleItem(this.selectedItem.id) != undefined;
  }

  previousTime(): string {
    let item = this.itemListService.getPreviousVisibleItem(this.selectedItem.id);
    return this.timeString(item);
  }

  nextTime(): string {
    let item = this.itemListService.getNextVisibleItem(this.selectedItem.id);    
    //return this.timeString(item);
    return moment(moment(this.selectedItem.ende).add(1, 'minutes').toDate()).format('HH:mm');
    
  }

  templateTime(): string {
    let item = this.itemListService.getPreviousItem(this.selectedItem.id);
    return this.timeString(item);
  }

  private timeString(item: Item): string {
    if (item) {
      return this.itemListService.time(item.start);
    }
    return undefined;
  }

  buttonOkTapped() {
    this.startProgress();
    this.logValid();
    
    this.activityTo(this.endTime);

    this.navCtrl.pop();
  }

  private activityTo(endTime: string) {
    let endDate;
    if (endTime == undefined) {
      endDate = moment(this.selectedItem.start).add(9, 'minutes').toDate();
    } else {
      let to = moment(this.selectedItem.start);
      to.set('hours', Number(endTime.substring(0, 2)));
      to.set('minutes', Number(endTime.substring(3)));
      if (to.isBefore(this.selectedItem.start)) {
        to.add(1, 'days');
      }
      endDate = to.toDate();
    }
    this.selectedItem.ende = endDate;
  }

  private logValid() {
    if (this.previousValid === false && this.itemListService.isValid(this.selectedItem)) {
      let start = this.itemListService.dateTime(this.selectedItem.start);
      console.log(start + ' is now valid.');
      this.logService.log('Eintrag von ' + start + ' ist nun gültig.');
    }
  }

  primaryTapped($event: MouseEvent) {
    this.pushActivityPage(true);
  }

  secondaryTapped($event: MouseEvent) {
    this.pushActivityPage(false);
  }

  private pushActivityPage(primary: boolean) {
    this.startProgress();
    this.activityService.getStoredActivities().then(activities => {
      this.navCtrl.push(ActivityPage, {
        allActivities: activities,
        item: this.selectedItem,
        primary: primary
      });
      this.stopProgress();
    })

  }

  buttonWhereTapped($event: MouseEvent) {
    this.startProgress();
    this.navCtrl.push(QuestionWherePage, {
      item: this.selectedItem
    });
    this.stopProgress();
  }

  buttonWhoTapped($event: MouseEvent) {
    this.startProgress();
    this.navCtrl.push(QuestionWhoPage, {
      item: this.selectedItem
    });
    this.stopProgress();
  }

  
  
  whereText(): string {
    let home;    
    this.translate.get('questions-where.home').subscribe(value => { home = value });
    let holiday;    
    this.translate.get('questions-where.holiday').subscribe(value => { holiday = value });
    let work;    
    this.translate.get('questions-where.work').subscribe(value => { work = value });
    let guest;    
    this.translate.get('questions-where.guest').subscribe(value => { guest = value });
    let food;    
    this.translate.get('questions-where.food').subscribe(value => { food = value });
    let shopping;    
    this.translate.get('questions-where.shopping').subscribe(value => { shopping = value });
    let hotel;    
    this.translate.get('questions-where.hotel').subscribe(value => { hotel = value });
    let other;    
    this.translate.get('questions-where.other').subscribe(value => { other = value });

    switch (this.selectedItem.ort) {
      //case 1: return "Zuhause";
      case 1: return home;
      case 2: return holiday;
      case 3: return work;
      case 4: return guest;
      case 5: return food;
      case 6: return shopping;
      case 7: return hotel;
      case 8: return other;
      default: return undefined;
    }
  }

  clearWhere() {
    this.selectedItem.ort = undefined;
  }

  clearAllein() {
    this.selectedItem.allein = false;
  }

  clearPartner() {
    this.selectedItem.partner = false;
  }

  clearKind() {
    this.selectedItem.kind = false;
  }

  clearMitglied() {
    this.selectedItem.mitglied = false;
  }

  clearAndere() {
    this.selectedItem.andere = false;
  }

  title(): string {
    return this.itemListService.title(this.selectedItem);
  }

  selectedCount(): number {
    return this.itemListService.getSelectedCount();
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
