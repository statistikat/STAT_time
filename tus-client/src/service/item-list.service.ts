import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { RestService } from './rest.service';
import { LogService } from './log.service';
import { NotificationService } from './notification.service';
import { UserService } from './user.service';
import { Item } from '../shared/entity/item';
import { Quest } from '../shared/entity/quest';
import { User } from './../shared/entity/user';
import { UpdateUser } from '../shared/data/update-user';

import * as moment from 'moment';

const Rest_updateUser = '/open/updateUser';
const KEY_ITEMS = 'items';

@Injectable()
export class ItemListService extends RestService {
  ALLOW_MULTISELECT: boolean = false;
  private items: Item[];
  private reverseItems: Array<Item>;
  private sendCount: number = 0;

  constructor(platform: Platform,
    private storage: Storage,
    private logService: LogService,
    private notificationService: NotificationService,
    private userService: UserService,
    http: Http,
    authService: AuthService
  ) {
    super(http, authService, platform);
    platform.ready().then(() => {
      this.loadItemsFromStorage();
    });
  }

  private loadItemsFromStorage() {
    this.storage.get(KEY_ITEMS).then(items => {
      if (items == null) {
        console.debug("loadItemsFromStorage: nothing found.");
      } else {
        this.setItems(items);
      }
    });
  }

  private setItems(items: Item[]) {
    this.items = items;
    console.debug("setItems: length=" + this.items.length);
    this.initReverseItems();
  }

  getItem(id: number): Promise<Item> {
    if (this.items == undefined) {
      return Promise.resolve(undefined);
    }
    let item = this.items.find(item => item.id === id);
    return Promise.resolve(item);
  }

  getNextVisibleItem(id: number): Item {
    for (let item of this.items) {
      if (item.id > id && !item.hidden) {
        return item;
      }
    }
    return undefined;
  }

  getPreviousVisibleItem(id: number): Item {
    for (let item of this.reverseItems) {
      if (item.id < id && !item.hidden) {
        return item;
      }
    }
    return undefined;
  }

  getPreviousItem(id: number): Item {
    for (let item of this.reverseItems) {
      if (item.id >= id || this.isEmpty(item)) {
        continue;
      }
      if (!this.isValid(item)) {
        return undefined;
      }
      return item;
    }
    return undefined;
  }

  getNextItem(): Item {
    let count = this.getSelectedCount();
    for (let item of this.items) {
      if (item.hidden) {
        continue;
      }
      if (count == 0 && this.isEmpty(item)) {
        return item;
      } else if (item.selected) {
        return item;
      }
    }
    return undefined;
  }

  private initReverseItems() {
    this.reverseItems = Array.from(this.items).reverse();
    console.debug("initReverseItems: length=" + this.reverseItems.length);
  }

  isValid(item: Item): boolean {
    return (item.primaryActivity && item.ort && this.isWho(item)) == true;
  }

  isEmpty(item: Item): boolean {
    return (!item.primaryActivity && !item.secondaryActivity && !item.ort && !this.isWho(item)) == true;
  }

  isWho(item: Item): boolean {
    return (item.allein || item.partner || item.kind || item.mitglied || item.andere) == true;
  }

  getItemsSlowly(day: Date, hours: number, minutes: number): Promise<Item[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getItems(day, hours, minutes)), 1000);
    });
  }

  /**
   * Liste der derzeit geladenen Items. Ist genau dann nicht leer,
   * wenn hasItems() true zurückgibt.
   */
  getCurrentItems(): Item[] {
    if (this.items == undefined) {
      return undefined;
    }
    if (this.reverseItems == undefined) {
      this.initReverseItems();
    }
    if (this.ALLOW_MULTISELECT) {
      return this.items.filter(item => !item.hidden);
    }
    return this.items;
  }

  /**
   * Items geladen. Wenn true, dann ist die Liste über getCurrentItems() verfügbar.
   */
  hasItems(): Promise<boolean> {
    return Promise.resolve(this.items != undefined && this.items.length > 0);
  }

  /**
   * Erzeugt die Liste der Items des übergebenen Tages, beginnend mit der übergebenen Startzeit.
   */
  getItems(day: Date, hours: number, minutes: number): Promise<Item[]> {
    // getItems(day: Date, hours: number, minutes: number, day2: Date): Promise<Item[]> {

    // list of time usage items
    this.items = [];
    let now = new Date();
    for (let i = 0; i < 144; i++) {
    //for (let i = 0; i < 3; i++) {
      let offset = Math.floor((minutes / 10 + i % 6) / 6);
      let hourRaw = (Math.floor(i / 6) + hours + offset);
      let hour = hourRaw % 24;
      let days = Math.floor(hourRaw / 24);
      let minuteFrom = ('00' + (i * 10 + minutes) % 60).slice(-2);
      let minuteTo = ('00' + (i * 10 + minutes + 9) % 60).slice(-2);
      let mmt = moment(day);
      mmt.add(days, 'days');
      let start = mmt.toDate();
      start.setHours(hour);
      start.setMinutes(Number(minuteFrom));
      start.setSeconds(0);
      start.setMilliseconds(0);
      let ende = new Date(start);
      ende.setMinutes(Number(minuteTo));
      this.items.push({
        id: i,
        start: start,
        ende: ende,
        updated: now,
        primaryActivity: '',
        secondaryActivity: '',
        allein: false,
        partner: false,
        kind: false,
        mitglied: false,
        andere: false,
        ort: undefined,
        hidden: false,
        selected: false
      } as Item);
    }
    this.persistItems().then(result => {
      console.debug(result.length + " items persisted.");
    })
    this.initReverseItems();
    return Promise.resolve(this.getCurrentItems());
  }

  title(item: Item) {
    return this.time(item.start) + ' - ' + this.time(item.ende);
  }

  time(d: Date): string {
    return moment(d).format('HH:mm');
  }

  dateTime(d: Date): string {
    return moment(d).format('YYYY-MM-DD HH:mm');
  }

  storeItems(forceSend?: boolean): void {
    this.extendFirstItem();
    this.persistItems().then(() => {
      // send only each 4th update to reduce load in case of timeouts
      if (forceSend || this.sendCount++ % 4 == 0) {
        this.sendItems(false).then(obs => obs.subscribe(result => {
          // success
        }))
      }
    })
  }

  /**
   * Copies the content of the first extended item to the following items
   * according to its extended end date.
   */
  extendFirstItem(): void {
    if (this.items) {
      for (let item of this.items) {
        if (this.extendItem(item)) {
          break;
        }
      }
    }
  }

  /**
   * Copies the content of an item to the following items according to the extended end date.
   * @param item source item
   * @return true if the item has been extended.
   */
  private extendItem(item: Item): boolean {
    let defaultEndDate = moment(item.start).add(9, 'minutes');
    if (defaultEndDate.isSame(item.ende)) {
      return false;
    }
    let result: boolean = false;
    for (let i = item.id + 1; i < this.items.length; i++) {
      let dst: Item = this.items[i];
      if (Number(dst.id) > Number(item.id)) {
        if (moment(dst.start).isAfter(item.ende)) {
          break;
        }
        this.copyItem(item, dst);
        result = true;
      }
    }
    item.ende = defaultEndDate.toDate();
    return result;
  }

  persistItems(): Promise<Item[]> {
    return this.storage.set(KEY_ITEMS, this.items);
  }

  allowCopy(item: Item): boolean {
    if (item.primaryActivity || item.secondaryActivity || item.ort
      || item.allein || item.partner || item.kind || item.mitglied || item.andere) {
      return false;
    }
    let template = this.getPreviousItem(item.id);
    if (template == undefined) {
      return false;
    }
    return true;
  }

  copyFromPrevious(destination: Item): Item {
    let template = this.getPreviousItem(destination.id);
    this.copyItem(template, destination);
    return template;
  }

  private copyItem(template: Item, destination: Item): void {
    destination.primaryActivity = template.primaryActivity;
    destination.secondaryActivity = template.secondaryActivity;
    destination.allein = template.allein;
    destination.partner = template.partner;
    destination.kind = template.kind;
    destination.mitglied = template.mitglied;
    destination.andere = template.andere;
    destination.ort = template.ort;
    destination.ende = moment(destination.start).add(9, 'minutes').toDate();
    destination.updated = new Date();
  }

  /**
   * Sends the list of items to the backend.
   * @param {boolean} finished mark questionnaire as finished
   * after successful transfer to the backend.
   */
  sendItems(finished: boolean): Promise<Observable<UpdateUser>> {
    // simulate data transfer
    if (this.isMockService()) {
      return new Promise(resolve => {
        setTimeout(() => {
          Observable.of(new UpdateUser());
        }, 1000);
      });
    }
    let quest: Quest = undefined;
    let user: User = undefined;
    let updateUser: UpdateUser = new UpdateUser();
    return this.userService.getStoredLoginData().then(login => {
      updateUser.loginData = login;
      updateUser.loginData.log = this.userService.screenSize();
      return this.userService.getStoredUser()
    }).then(u => {
      user = u;
      quest = user.quests[0];
      quest.slots = this.items;
      quest.finished = finished;
      return this.userService.getStoredWbs()
    }).then(wbs => {
      quest.wbs = wbs ? wbs : [];
      updateUser.user = user;
      return this.logService.getLogs();
    }).then((logs) => {
      updateUser.user.logs = logs;
      return this.sendPost(Rest_updateUser, updateUser, UpdateUser);
    }).then(obs => {
      this.logService.clearLogs();
      return obs
    });
  }

  clearItems(): Promise<Item[]> {
    let promise = this.storage.remove(KEY_ITEMS);
    promise.then(() => {
      this.items = undefined;
      this.reverseItems = undefined;
    });
    return promise;
  }

  clearSelection() {
    if (this.items == undefined) {
      return;
    }
    for (let item of this.items) {
      item.selected = false;
    }
  }

  getSelectedCount() {
    if (this.items == undefined) {
      return 0;
    }
    let count = 0;
    for (let item of this.items) {
      if (item.selected && !item.hidden) {
        console.debug("item #" + item.id + " is selected.");
        count++;
      }
    }
    return count;
  }

  getSelectedItems(): Item[] {
    return this.items.filter(item => item.selected);
  }

  /**
   * returns the number of entries where primary activity was not completed.
   */
  unansweredEntries(): number {
    return this.items.filter(item => !item.primaryActivity).length;
  }

  expandSelectionTo(selectedItem: Item) {
    if (this.getSelectedItems().length == 0) {
      selectedItem.selected = true;
    } else {
      let select: boolean = false;
      for (let item of this.items) {
        if (item == selectedItem || item.selected) {
          if (select) {
            item.selected = true;
            break;
          } else {
            select = true;
            if (item == selectedItem) {
              item.selected = true;
            }
          }
        } else if (select) {
          item.selected = true;
        }
      }
    }
  }

  copyToOtherSelected(selectedItem: Item) {
    if (selectedItem == undefined || !selectedItem.selected) {
      return;
    }
    for (let item of this.items) {
      if (item != selectedItem && item.selected && !item.hidden) {
        item.primaryActivity = selectedItem.primaryActivity;
        item.secondaryActivity = selectedItem.secondaryActivity;
        item.allein = selectedItem.allein;
        item.partner = selectedItem.partner;
        item.kind = selectedItem.kind;
        item.mitglied = selectedItem.mitglied;
        item.andere = selectedItem.andere;
        item.ort = selectedItem.ort;
        item.updated = selectedItem.updated;
      }
    }
  }

  reset(): Promise<any> {
    return this.notificationService.cancelAllWellbeing().then(() => {
      return this.clearItems()
    }).then(() => {
      return this.userService.removeStoredWbs()
    }).then(() => {
      return this.userService.removeStoredUser()
    }).then(() => {
      return this.userService.removeStoredLoginData()
    }).then(() => {
      return this.storage.clear()
    })
  }

}
