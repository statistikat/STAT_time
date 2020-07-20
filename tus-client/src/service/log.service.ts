import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Log } from '../shared/entity/log';

const KEY_LOGS = 'logs';

@Injectable()
export class LogService {
  private logs: Log[];

  constructor(
    private platform: Platform,
    private storage: Storage
  ) {
    this.platform.ready().then(() => {
      return this.getLogs();
    }).then((logs) => {
      this.logs = logs;
    });
  }

  log(text: string): Promise<Log[]> {
    if (!this.logs) {
      this.logs = [];
    }
    let logs = this.logs;
    let log = new Log();
    log.at = new Date();
    log.log = text;
    logs.push(log);
    return this.persist(logs);
  }

  private persist(logs: Log[]): Promise<Log[]> {
    this.logs = logs;
    return this.storage.set(KEY_LOGS, logs);
  }

  getLogs(): Promise<Log[]> {
    if (this.logs) {
      return new Promise<Log[]>((resolve) => { resolve(this.logs) });
    }
    return this.storage.get(KEY_LOGS);
  }

  clearLogs(): Promise<Log[]> {
    this.logs = undefined;
    return this.storage.remove(KEY_LOGS);
  }

}
