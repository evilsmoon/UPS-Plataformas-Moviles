import { Injectable } from '@angular/core';

import { NavController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx'

import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor(
    private storage: NativeStorage, 
    private inAppBrowser: InAppBrowser, 
    private navCtrl: NavController
    ) {
    this.loadStorage();
  }

  async loadStorage() {
    this.guardados =  ( await this.storage.getItem('registros')) || [];
  }

  async saveRegister(format: string, text: string) {

    // await this.loadStorage();

    const newRegister = new Registro(format, text);
    this.guardados.unshift(newRegister);
    this.storage.setItem('registros', this.guardados);
    this.openRegister(newRegister);

  }

  openRegister(registro: Registro) {

    this.navCtrl.navigateForward('/tabs/tab2');
    
    console.log(registro.type);
    switch (registro.type) {

      case 'http':
        this.inAppBrowser.create(registro.text, '_system');
        break;

      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
        break;

    }


  }
}
