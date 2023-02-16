import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Producto } from '../models/producto';
import { ViewPage } from '../view/view.page';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  // guardados: Producto[] = [];
  guardados!: Array<Producto>;
  constructor(private storage: NativeStorage, private navCtrl: NavController) {
    this.cargarStorage();
  }

  async cargarStorage() {
    this.guardados = (await this.storage.getItem('productos')) || [];
  }
  async guardarProducto(
    _id: string,
    nombre: string,
    tipo: string,
    marca: string,
    precio: number,
    proveedor: string
  ) {

    const nuevoProducto = new Producto(
      _id,
      nombre,
      tipo,
      marca,
      precio,
      proveedor
    );
      

    this.guardados.unshift(nuevoProducto);

    this.storage.setItem('productos', this.guardados);

    this.abrirProducto(nuevoProducto);
  }

  abrirProducto(producto: Producto) {
  
    this.navCtrl.navigateForward('/tabs/tab2');
    this.navCtrl.navigateForward(`/tabs/tab2/producto/`,{
      "queryParams":{
        producto
      }
    });

  }
}
