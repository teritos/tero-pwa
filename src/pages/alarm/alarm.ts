import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Alarm } from '../../app/alarm';
import { AlarmService } from '../../app/alarm.service';
import { NavController, NavParams, Platform} from 'ionic-angular';


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
  alarmas: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public platform: Platform,
              public alarmService: AlarmService) {


    //alarmService.getAlarms()
    //.subscribe(alarms => this.alarms = alarms);
    this.alarmas = [{
      id: 1,
      name: 'Alarma1',
      active: false
    }, {
      id: 2,
      name: 'Alarma2',
      active: true
    }, {
      id: 3,
      name: 'Alarma3',
      active: true
    }];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlarmPage');
  }

  logout() {
    console.log('salir');
    this.storage.set('authenticated', false);
    this.platform.exitApp();
  }

  alarmChange(algo){
    alert('cambio');
    this.alarmService.changeAlarm(1, true)
    .subscribe(res => alert(res));
  }

}
