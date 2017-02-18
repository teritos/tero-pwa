import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Alarm } from './alarm';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Constantes } from './constants';
import { Storage } from '@ionic/storage';

@Injectable()
export class AlarmService {

  constructor (private http: Http, private constants: Constantes, private st: Storage) {}

  getAlarms(token): Observable<Alarm[]> {
    //return this.http.get('http://localhost:8000/api/cliente/?format=json')
    //.map(this.extractData);

    let headers = new Headers({
      'Authorization': 'Basic ' + token,
      'Accept': 'application/json',
      'Content-Type': 'application/json '
    });
    let options = new RequestOptions({ headers: headers });
    console.log(token);
    return this.http.get(this.constants.getURL() + '/api/v1/alarm/?format=json', options)
    .map((res) => res.json());

  }

  changeAlarm(token, id, active): Observable<Alarm[]> {
    /*
      Actualizar el estado de la alarma `id`
    */

    let headers = new Headers(
      {
        'Authorization': 'Basic ' + token,
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
