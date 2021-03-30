
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { EntitySerializableUtil, EntitySerializable } from '../shared/entity/entity-serializable';
import { Platform } from 'ionic-angular';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

// const xAuthToken = 'stat-auth-token';
// const xAuthUserName = 'X-Auth-Username';

// @Injectable()
export abstract class RestService {
    private SERVER = 'https://www.statistik.at/tus/server';    // production url
    //private SERVER = 'http://10.0.2.2:7070/statistik.at/tus/server';  // Android emulator access to local dev server
    //private SERVER = 'http://localhost:7070/statistik.at/tus/server';  // Android emulator access to local dev server
    
    protected errorMessage = null;

    constructor(
        protected http: Http,
        protected authService: AuthService,
        protected platform: Platform
    ) { }

    protected sendGet<T extends EntitySerializable<any>>(url: string, type: { new (): T; }): Observable<T> {

        this.preSend();
        // console.log('url: ' + this.getUrl(url));
        // console.log('AuthHeader: ' + this.getAuthHeader());
        return this.http.get(this.getUrl(url), { headers: this.getAuthHeader() })
            .map(res => <T>this.postSend(res, type))
            .catch(this.handleErrorExt(this));
    }

    protected sendPost<T extends EntitySerializable<any>>(url: string, body: any, type: { new (): T; }) {

        this.preSend();

        let bodyJson = '';

        if (body !== null) {
            bodyJson = JSON.stringify(body);
        }

        const headers = this.getAuthHeader();
        headers.append('Content-Type', 'application/json');

        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.getUrl(url), bodyJson, options)
            .map(res => <T>this.postSend(res, type))
            .catch(this.handleErrorExt(this));
    }

    protected sendGetArray<T extends EntitySerializable<any>>(url: string, type: { new (): T; }): Observable<T[]> {

        this.preSend();

        return this.http.get(this.getUrl(url), { headers: this.getAuthHeader() })
            .map(res => <T[]>this.postSendArray(res, type))
            .catch(this.handleErrorExt(this));
    }

    protected sendPostArray<T extends EntitySerializable<any>>(url: string, body: any, type: { new (): T; }): Observable<T[]> {

        this.preSend();

        let bodyJson = '';

        if (body !== null) {
            bodyJson = JSON.stringify(body);
        }

        const headers = this.getAuthHeader();
        headers.append('Content-Type', 'application/json');

        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.getUrl(url), bodyJson, options)
            .map(res => <T[]>this.postSendArray(res, type))
            .catch(this.handleErrorExt(this));
    }


    protected sendDelete<T extends EntitySerializable<any>>(url: string, type: { new (): T; }) {

        this.preSend();

        return this.http.delete(this.getUrl(url), { headers: this.getAuthHeader() })
            .catch(this.handleErrorExt(this));
    }

    private preSend() {
        this.errorMessage = null;
    }

    protected postSend<T extends EntitySerializable<any>>(response: Response, type: { new (): T; }): T {
        this.postHeaders(response);
        return EntitySerializableUtil.convertToObject(type, response.json());
    }

    protected postSendArray<T extends EntitySerializable<any>>(response: Response, type: { new (): T; }): T[] {
        this.postHeaders(response);
        const valueRet: T[] = [];
        for (const value of response.json()) {
            valueRet.push(EntitySerializableUtil.convertToObject(type, value));
        }
        return valueRet;
    }


    private getUrl(restUrl: string) {
      if (this.platform.is('cordova')) {
        return this.SERVER + restUrl;
      }
      return this.SERVER + restUrl;
      //return restUrl; // use proxy configuration in ionic.config.json to handle CORS issues
    }

    private postHeaders(response: Response) {
        // var headers = response.headers;
        // if (headers.has(xAuthToken)) {
        //     var token = headers.get(xAuthToken);
        //     console.log("X-Auth-Token  = " + token);
        //     this.authService.token = token;

        // }
    }

    private getAuthHeader(): Headers {
        const headers = new Headers();
        // if (this.authService.token !== undefined) {
        //     headers.append(xAuthToken, this.authService.token);
        // }
        return headers;
    }

    private handleErrorExt(restService: RestService) {
        return function (error: Response) {
            const text = error.text();
            const errorMessage = text.trim().startsWith('{') ? JSON.parse(text)['message'] : text;
            console.error(errorMessage);
            restService.errorMessage = errorMessage;
            return Observable.throw(errorMessage);
        };
    }

    protected isMockService(): boolean {
      return false //this.platform.is('cordova')
    }
}
