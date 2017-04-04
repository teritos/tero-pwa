import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';

import { OneSignal } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;
  @ViewChild('nav') nav: NavController
  constructor(platform: Platform,
              storage: Storage,
) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // Enable to debug issues.
      /*OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
      OneSignal.startInit('fc118136-de98-495d-8a08-cb7163897d06', '327499183179');

      OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);

      OneSignal.handleNotificationReceived().subscribe(() => {
       // do something when notification is received
       console.log('Notificacion recibida <---');
      });

      /*OneSignal.handleNotificationOpened().subscribe((jsonData) => {
        // do something when a notification is opened
        if (jsonData.action == "updateImages") {
          // Abrir la solapa notificaciones y descargar
          // las imagenes
          this.nav.push(AboutPage);
        }
        console.log('Notificacion abierta <---')
      });

      OneSignal.endInit();
/*

      /*
      $.post("http://192.168.91.33:8000/api/v1/device/" + userId + "/", {
        "active": isSubscribed,
      }, function(){
        alert("ID guardado");
      })
      .failed(function(){
        alert("fallo");
      });
      */

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
