import { Storage } from '@ionic/storage';

export class Constants {

    constructor(){}

    getURL() {
      return 'http://localhost:8000';
    }

    getToken(){
      return btoa('admin:juanjuan');
    }

}
