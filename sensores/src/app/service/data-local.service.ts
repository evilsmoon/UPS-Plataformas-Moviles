import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { NavController } from '@ionic/angular';
import { Registro } from '../models/registro.model';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {


  guardados: Registro[] = [];

  constructor(private storage: NativeStorage,    private navCtrl: NavController) {

    this.createCredencial;
    this.loadStorage();

  }
  login(email: string, password: string) {
    console.log(email);
    console.log(password);
    if (email != "admin"
      || password != "admin") {
      return false;
    }
    return true;

  }


  async loadStorage() {
    this.guardados =  ( await this.storage.getItem('registros')) || [];
  }

  async saveRegister(codigo: string,
    razon: string,
    nombre: string,
    lat: number,
    lon: number,
    ) {

    // await this.loadStorage();

    const newRegister = new Registro(codigo, razon, nombre,lat,lon);
    this.guardados.unshift(newRegister);
    this.storage.setItem('registros', this.guardados);
    // this.openRegister(newRegister);

  }

  openRegister() {

    this.navCtrl.navigateForward('/app/tabs/tab3');
    


  }

  async saveCrendencial(username: string, password: string) {

    this.storage.setItem('username', username);
    this.storage.setItem('password', password);
  }
  async createCredencial() {


    this.storage.setItem('username', 'admin');
    this.storage.setItem('password', 'admin');
  }

  async validar(username: string, password: String) {
    const user = await this.storage.getItem('username')
    const pass = await this.storage.getItem('password')

    if (username == user && password == pass) {
      return true;
    } else {
      return false;
    }
  }

  
}
