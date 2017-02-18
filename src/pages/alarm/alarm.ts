import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Alarm } from '../../app/alarm';
import { AlarmService } from '../../app/alarm.service';
import { NavController, NavParams, Platform, ActionSheetController} from 'ionic-angular';


/*
  Generated class for the Alarm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html'
})
export class AlarmPage {
  alarms: Alarm[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public platform: Platform,
              public alarmService: AlarmService,
              public actionSheetCtrl: ActionSheetController) {


    this.actualizarAlarmas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmPage');
  }

  logout() {
    console.log('salir');
    this.storage.set('authenticated', false);
    this.platform.exitApp();
  }

  actualizarAlarmas() {
    // Actualizar alarmas
    this.storage.get('token').then((token) => {
      console.log('TOKEN --->');
      console.log(token);
      this.alarmService.getAlarms(token)
      .subscribe(alarms => this.alarms = alarms);
    });

  }

  presentActionSheet(id) {

    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Activar',
          role: 'activar',
          handler: () => {
            this.storage.get('token').then((token) => {
              this.alarmService.changeAlarm(token, id, 1)
              .subscribe( () => {
                this.storage.get('token').then((token) => {
                  console.log('TOKEN --->');
                  console.log(token);
                  this.alarmService.getAlarms(token)
                  .subscribe(alarms => this.alarms = alarms);
                });
              })
            })
          }
        }, {
            text: 'Desactivar',
            role: 'Desactivar',
            handler: () => {
              this.storage.get('token').then((token) => {
                this.alarmService.changeAlarm(token, id, 0)
                .subscribe( () => {
                  this.storage.get('token').then((token) => {
                    console.log('TOKEN --->');
                    console.log(token);
                    this.alarmService.getAlarms(token)
                    .subscribe(alarms => this.alarms = alarms);
                  });
                })
              })
            }
        }, {
            text: 'Cancelar',
            role: 'Cancelar',
            handler: () => {}
        }
      ]
    });
    actionSheet.present();
  }

}
