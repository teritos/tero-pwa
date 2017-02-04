import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Alarm } from './alarm';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Constants } from './constants';

@Injectable()
export class AlarmService {

  constructor (private http: Http, private constants: Constants) {}

  getAlarms(): Observable<Alarm[]> {
    //return this.http.get('http://localhost:8000/api/cliente/?format=json')
    //.map(this.extractData);

    return this.http.get(this.constants.getURL() + '/api/alarm/?format=json')
    .map((res) => res.json());

  }

  changeAlarm(id, active): Observable<Alarm[]> {
    /*
      Actualizar el estado de la alarma `id`
    */
    console.log('changeAlarm');
    return this.http.post(this.constants.getURL() + '/api/alarm/' + id + '/',
    { active: active })
    .map((res) => res.json());

  }

}
