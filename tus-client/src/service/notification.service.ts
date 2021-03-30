import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';

import { LogService } from './log.service';

import * as moment from 'moment';

const KEY_SCHEDULED_NOTIFICATIONS = 'scheduledNotifications';

@Injectable()
export class NotificationService {
  public static TIMEOUT: number = 10 // minutes;
  private nextId: number = 1;
  private processedTimeIds: Array<number> = [];
  private scheduledIds: Array<{ id: number, timeId: number, startTime: Date }> = [];
  private cancelledIds: Array<{ id: number, timeId: number, startTime: Date }> = [];

  constructor(
    private localNotifications: LocalNotifications,
    private platform: Platform,
    private storage: Storage,
    private vibration: Vibration,
    private logService: LogService) {

    this.platform.ready().then(() => {
      if (this.notificationsSupported()) {
        this.localNotifications.registerPermission().then(() => {
          this.localNotifications.on("trigger", (notification) => {
            console.log("notification #" + notification.id + " triggered.");
            for (let oldId = 0; oldId != notification.id; oldId++) {
              // avoid duplicate notifications when app is closed
              this.cancel(oldId);
            }
            this.vibration.vibrate(1000);
            setTimeout(() => {
              this.cancel(notification.id);
            }, NotificationService.TIMEOUT * 60 * 1000);
            if (this.scheduledIds == undefined || this.scheduledIds.length == 0) {
              this.loadScheduledNotifications();
            }
          });
          console.log('notification trigger handler registered successfully.');
        });
      }
    });
  }

  private notificationsSupported() {
    return this.platform.is('cordova');
  }

  /**
   * Registers the callback to be executed if the user selects a wellbeing
   * notification. This function should be called only one time.
   */
  registerCallback(callback: any) {
    if (this.notificationsSupported()) {
      this.localNotifications.on("click", callback);
    }
  }

  /**
   * Schedules a wellbeing notification for the specified time.
   * If the time is before start time, it will be scheduled for the next day.
   * If the time is between start time and current time, the request is ignored.
   */
  private scheduleWellbeing(at: Date, startTime: String, timeId: number) {
    if (!this.notificationsSupported()) {
      return;
    }
    let start = moment();
    start.set('hours', Number(startTime.slice(0, 2)));
    start.set('minutes', Number(startTime.slice(3)));
    start.set('seconds', 0);
    let atm = moment(at);
    if (atm.isBefore(start)) {
      atm.add(1, 'days');
    }
    if (atm.isBefore(moment())) {
      this.logService.log('Wellbeing-Frage versäumt: ' + atm.toDate());
      console.debug('scheduleWellbeing: ignoring ' + atm.toISOString());
      return;
    }
    let currentId = this.nextId++;
    console.log("scheduleWellbeing: (id=" + currentId + ", timeId=" + timeId + ") - " + atm.toISOString());
    this.localNotifications.schedule({
      id: currentId,
      title: "STAT_time",
      text: "Bitte sagen Sie uns, wie es Ihnen jetzt gerade geht.",
      led: '0000FF',
      at: atm.toDate(),
      data: timeId
    });
    this.scheduledIds.push({ id: currentId, timeId: timeId, startTime: atm.toDate() });
  }

  /**
   * Schedules wellbeing notifications for all the times on the specified day.
   * Times are to be specified as numbers, e.g. 940 for 09:40.
   */
  scheduleAllWellbeing(day: Date, startTime: String, times: number[]) {
    this.cancelAllWellbeing();
    this.processedTimeIds = [];
    let timeId: number = 0;
    for (let time of times) {
      let at = this.createDate(day, time);
      this.scheduleWellbeing(at, startTime, timeId++);
    }
    this.storeScheduledNotifications();
  }

  createDate(day: Date, wbTime: number): Date {
    let dayStr = moment(day).format('YYYYMMDD');
    let at;
    if (wbTime == -1) {
      // trigger instant notification for test purposes
      at = moment().add(15, 'seconds');
    } else {
      let timeStr = ("0" + wbTime).slice(-4);
      at = moment(dayStr + timeStr, "YYYYMMDDHHmm");
    }
    return at.toDate();
  }

  loadScheduledNotifications(): Promise<any> {
    return this.storage.get(KEY_SCHEDULED_NOTIFICATIONS).then(ids => {
      if (ids != undefined) {
        this.scheduledIds = ids;
      }
    });
  }

  private storeScheduledNotifications(): Promise<any> {
    return this.storage.set(KEY_SCHEDULED_NOTIFICATIONS, this.scheduledIds);
  }

  cancelAllWellbeing(): Promise<any> {
    for (let notificationId = 0; notificationId < this.nextId; notificationId++) {
      this.doCancel(notificationId, false);
    }
    return this.storage.remove(KEY_SCHEDULED_NOTIFICATIONS);
  }

  cancelTriggeredIds() {
    this.getTriggeredNotificationIds().then(ids => {
      for (let id of ids) {
        this.doCancel(id, false);
      }
      this.storeScheduledNotifications();
    });
  }

  cancelByTimeId(timeId: number): void {
    for (let entry of this.cancelledIds) {
      if (entry.timeId == timeId) {
        this.cancel(entry.id);
        break;
      }
    }
    for (let entry of this.scheduledIds) {
      if (entry.timeId == timeId) {
        this.cancel(entry.id);
        return;
      }
    }
  }

  timeIdForNotificationId(notificationId: number): number {
    for (let entry of this.cancelledIds) {
      if (entry.id = notificationId) {
        return entry.timeId;
      }
    }
    for (let entry of this.scheduledIds) {
      if (entry.id == notificationId) {
        return entry.timeId;
      }
    }
    return undefined;
  }

  cancel(notificationId: number): void {
    this.doCancel(notificationId, true);
  }

  private doCancel(notificationId: number, persist: boolean) {
    if (this.notificationsSupported()) {
      this.scheduledIds.forEach(entry => {
        if (entry.id == notificationId) {
          this.cancelledIds.push(entry);
        }
      });
      this.scheduledIds = this.scheduledIds.filter((entry) => {
        return entry.id != notificationId;
      });
      if (persist) {
        this.storeScheduledNotifications();
      }
      this.localNotifications.cancel(notificationId).then(() => {
        console.log("notification #" + notificationId + " cancelled.");
      });
    }
  }

  getTriggeredNotificationIds(): Promise<number[]> {
    if (this.notificationsSupported()) {
      return this.localNotifications.getTriggeredIds();
    }
    return Promise.resolve(undefined);
  }

  isUnprocessedTimeId(timeId: number): boolean {
    if (timeId == undefined) {
      return false;
    }
    return this.processedTimeIds.indexOf(timeId) == -1;
  }

  setProcessedTimeId(timeId: number) {
    if (this.isUnprocessedTimeId(timeId)) {
      this.processedTimeIds.push(timeId);
    }
  }

  /**
   * Gibt die TimeId der Notification zurück, die zum aktuellen Zeitpunkt aktiv ist.
   */
  getActiveTimeId(): number {
    let now = moment();
    for (let entry of Array.from(this.scheduledIds.entries())) {
      let startTime = entry[1].startTime;
      let endTime = moment(startTime).add(NotificationService.TIMEOUT, 'minutes');
      if (now.isBetween(startTime, endTime)) {
        return entry[1].timeId;
      }
    }
    return undefined;
  }

}
