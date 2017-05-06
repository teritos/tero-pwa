import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';

import { OneSignalService } from '../../app/onesignal.service';
import { OneSignal } from 'ionic-native';
import { TabsPage } from '../tabs/tabs';
import { Constantes } from '../../app/constants';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string;
  password: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public http: Http,
              private constants: Constantes,
              private osService: OneSignalService) {

  }

  ionViewDidLoad() {
    /*
      Si el usuario esta logueado accede a la vista de tabs
      de lo contrario debera iniciar sesion
    */
    this.storage.get('token').then((val) => {
      if (val != null || val != undefined) {
        this.navCtrl.push(TabsPage);
      }
    });
  }


  login(){
    /*
      Mostrar que la aplicacion esta haciendo algo
    */
    let loader =  this.loadingCtrl.create({
      content: "Iniciando sesion...",
      duration: 3000
    });

    loader.present();
    this.http.post(this.constants.getURL() + '/dash/ajax-login/', JSON.stringify({
      "username": this.username,
      "password": this.password
    }))
    .toPromise()
    .then((res) => {
      //let data = res.json();
      this.storage.set('authenticated', true);

      // Esto es solo para Devel hasta implementar la autorizacion por token
      this.storage.set('token', btoa(this.username + ':' + this.password));
      this.storage.get('token').then((token) => {
        console.log('TOKEN --->');
        console.log(token);
      });
      this.navCtrl.push(TabsPage);
      loader.dismiss();

      OneSignal.getIds().then((data) => {
        this.storage.get('token').then((token) => {
          this.osService.setOneSignalID(token, data.userId)
          .subscribe(res => {
            console.log(res);
          });
        });
      });

    })
    .catch((err) => {
      //var data = err.json();
      this.storage.set('authenticated', false);
      console.log(err);
      loader.dismiss();
    });

  }

}
