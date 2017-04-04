import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { AlarmPage } from '../pages/alarm/alarm';
import { LoginPage } from '../pages/login/login';
import { AlarmService } from './alarm.service';
import { OneSignalService } from './onesignal.service';
import { ImageService } from './image.service';
import { Constantes } from './constants';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    TabsPage,
    AlarmPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AlarmPage,
    TabsPage,
    LoginPage
  ],
  providers: [
    Storage,
    OneSignalService,
    AlarmService,
    ImageService,
    Constantes,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
