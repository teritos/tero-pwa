import { Component } from '@angular/core';
import { ImageService } from '../../app/image.service';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  images = Array();

  constructor(public navCtrl: NavController, public imageService: ImageService,
              public storage: Storage) {
      this.updateImages();
  }

  refreshImagenes(refresher) {
    this.updateImages();
    refresher.complete();
  }

  updateImages() {
    // Actualizar las imagenes
    this.storage.get("token").then((token) => {
      console.log('Descargando imagenes');
      this.imageService.getLastImages(token)
      .subscribe((images) => this.images = images);
    });

  }
}
