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
  url = "http://localhost:8000";

  constructor(public navCtrl: NavController, public imageService: ImageService,
              public storage: Storage) {
      this.updateImages();
  }

  updateImages() {
    // Actualizar las imagenes
    this.storage.get("token").then((token) => {
      this.imageService.getLastImages(token)
      .subscribe((images) => this.images = images);
    });

  }

}
