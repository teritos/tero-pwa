import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Alarm } from './alarm';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Constants } from './constants';
import { Storage } from '@ionic/storage';

@Injectable()
export class AlarmService {

  constructor (private http: Http, private constants: Constants, private st: Storage) {}

  getAlarms(): Observable<Alarm[]> {
    //return this.http.get('http://localhost:8000/api/cliente/?format=json')
    //.map(this.extractData);

    let headers = new Headers({
      'Authorization': 'Basic ' + this.constants.getToken(),
      'Accept': 'application/json',
      'Content-Type': 'application/json '
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.constants.getURL() + '/api/v1/alarm/?format=json', options)
    .map((res) => res.json());

  }

  changeAlarm(id, active): Observable<Alarm[]> {
    /*
      Actualizar el estado de la alarma `id`
    */

    let headers = new Headers(
      {
        'Authorization': 'Basic ' + this.constants.getToken(),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    );
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.constants.getURL() + '/api/v1/alarm/' + id + '/',
    JSON.stringify({ status: active }),
    options)
    .map((res) => res.json());

  }

}
