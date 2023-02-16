import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Coordinates } from '../models/coordinates.models';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  history: Coordinates[] = [];
  constructor(private storage: NativeStorage,) {
    this.loadStorage();
  }

  async loadStorage() {
    this.history = (await this.storage.getItem('history')) || [];
  }

  async saveCoords(lat: number, lon: number) {

    const newCoord = new Coordinates(lat, lon);
    this.history.unshift(newCoord);
    this.storage.setItem("history", this.history);
  }

  async saveCrendencial(username: string, password: string) {

    this.storage.setItem('username', username);
    this.storage.setItem('password', password);
  }

  async validar(username: string, password: String): Promise<Boolean> {
    const user = await this.storage.getItem('username')
    const pass = await this.storage.getItem('password')

    if (username == user && password == pass) {
      return true;
    } else {
      return false;
    }
  }
}
