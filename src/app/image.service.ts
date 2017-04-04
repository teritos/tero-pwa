import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Constantes } from './constants';
import { Storage } from '@ionic/storage';

@Injectable()
export class ImageService {

  constructor (private http: Http, private constants: Constantes, private st: Storage) {}

  getLastImages(token): Observable<any[]> {

    let headers = new Headers({
      'Authorization': 'Basic ' + token,
      'Accept': 'application/json',
      'Content-Type': 'application/json '
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.constants.getURL() + '/api/v1/alarm/images?format=json', options)
    .map((res) => res.json());

  }

}
