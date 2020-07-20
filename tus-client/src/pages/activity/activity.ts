import { Dict } from './../../shared/entity/dict';
import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import * as Fuse from 'fuse.js';
import * as moment from 'moment';

import { Item } from '../../shared/entity/item';
import { EndTimePage } from '../end-time/end-time';
import { ActivityService } from '../../service/activity.service';
import { ItemListService } from '../../service/item-list.service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the Activity page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  @ViewChild('input') searchBar;
  private selectedItem: Item;
  private primary: boolean;
  private title: string;
  private allActivities: Dict[];
  private activities: string[];
  private selectedActivity: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public activityService: ActivityService,
    public itemListService: ItemListService,
    public translate: TranslateService
  ) {

    translate.setDefaultLang('en');
    this.selectedItem = navParams.get('item');
    this.primary = navParams.get('primary');
    this.allActivities = navParams.get("allActivities")
    if (this.allActivities == undefined || this.allActivities == null) {
      this.allActivities = new Array<Dict>();
    }
    if (this.primary) {
      //this.title = "Haupttätigkeit";
      translate.get('item-details.activity-primary').subscribe(value => { this.title = value });

      this.selectedActivity = this.selectedItem.primaryActivity;
    } else {
      //this.title = "Nebentätigkeit";
      translate.get('item-details.activity-secondary').subscribe(value => { this.title = value });
      this.selectedActivity = this.selectedItem.secondaryActivity;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Activity');
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 150);
  }

  onInput(ev: any) {
    let val: string = ev.target.value;
    this.filter(val);
    this.selectedActivity = val;
  }

  private filter(val: string) {
    if (!val || val.trim().length < 3) {
      this.activities = [];
    } else {
      this.fuseSearch(val);
    }
  }

  private fuseSearch(val: string) {
    let fuseSearch = new Fuse(this.allActivities.map(val => val.entry), {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 1000,
      maxPatternLength: 32,
      minMatchCharLength: 1
    });
    this.activities = fuseSearch.search(val).map(key => {
      return this.allActivities.map(val => val.entry)[key];
    });
  }

  select(activity: string) {
    this.selectedActivity = activity;
    this.close();
  }

  close() {
    //if (this.primary && this.isVariableEndTime()) {
    //  this.selectEndTime();
    //}
    this.navCtrl.pop();
  }

  private isVariableEndTime(): boolean {
    if (this.selectedActivity == undefined) {
      return false;
    }
    let selection = this.selectedActivity.trim().toLowerCase();
    for (let act of this.allActivities) {
      if (selection == act.entry.toLowerCase()) {
        return act.var;
      }
    }
    return false;
  }

  private selectEndTime() {
    let endTimeModal = this.modalCtrl.create(EndTimePage, {
      activity: this.selectedActivity,
      to: this.selectedItem.ende
    });
    endTimeModal.onDidDismiss(data => {
      this.activityTo(data == undefined ? undefined : data.endTime);
    });
    endTimeModal.present();
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

  ionViewWillLeave() {
    if (this.primary) {
      this.selectedItem.primaryActivity = this.selectedActivity;
    } else {
      this.selectedItem.secondaryActivity = this.selectedActivity;
    }
    this.selectedItem.updated = new Date();
    this.itemListService.copyToOtherSelected(this.selectedItem);
  }

}
