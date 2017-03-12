import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Constantes } from './constants';

@Injectable()
export class OneSignalService {

  constructor (private http: Http, private constants: Constantes) {}

  setOneSignalID(token, id): Observable<any> {
    /*
      Guardar el ID para este dispositivo
    */

    let headers = new Headers(
      {
        'Authorization': 'Basic ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    );
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.constants.getURL() + '/api/v1/device/' + id + '/',{}, options)
    .map((res) => res.json());

  }

}
