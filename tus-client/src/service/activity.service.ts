import { Storage } from '@ionic/storage';
import { LoginData } from './../shared/entity/login-data';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Dict } from './../shared/entity/dict';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { RestService } from './rest.service'
const Rest_getDict = '/open/getDictionary';

@Injectable()
export class ActivityService extends RestService {
  labelAttribute = 'activity';

  constructor(platform: Platform, http: Http, authService: AuthService, private storage: Storage) {
    super(http, authService, platform)

  }

  loadAllActivities(loginData: LoginData): Observable<Dict[]> {

    if (this.isMockService()) {

      let activities: Dict[] = [
        { var: true, entry: 'Nachtruhe' } as Dict,
        { var: true, entry: 'Schlafen' } as Dict,
        { var: true, entry: 'Aufstehen' } as Dict,
        { var: true, entry: 'Schlafen auch unter Tags bei Schichtarbeit' } as Dict,
        { var: false, entry: 'Mittagschlaf' } as Dict,
        { var: false, entry: 'Nickerchen' } as Dict,
        { var: false, entry: 'Im Bett wegen Krankheit' } as Dict,
        { var: false, entry: 'Zärtlichkeiten austauschen' } as Dict,
        { var: false, entry: 'mit Parnter kuscheln' } as Dict,
        { var: false, entry: 'Sex' } as Dict,
        { var: false, entry: 'Entspannen' } as Dict,
        { var: false, entry: 'Meditation' } as Dict,
        { var: false, entry: 'Nichtstun' } as Dict,
        { var: false, entry: 'Autogenes Training' } as Dict,
        { var: false, entry: 'Rauchpause' } as Dict,
        { var: false, entry: 'in der Sonne liegen' } as Dict,
        { var: false, entry: 'aus dem Fenster schauen' } as Dict,
        { var: false, entry: 'Aquarium betrachten' } as Dict,
        { var: false, entry: 'beten' } as Dict,
        { var: false, entry: 'Nichtstun wegen Krankheit' } as Dict,
      ];
      return Observable.of(activities);
    }
    return this.sendPostArray(Rest_getDict, loginData, Dict);
  }

 setStoredActivities(activities: Dict[]) {
    this.storage.set('activities', activities);
  }

  getStoredActivities(): Promise<Dict[]> {
    return this.storage.get('activities');
  }
}
