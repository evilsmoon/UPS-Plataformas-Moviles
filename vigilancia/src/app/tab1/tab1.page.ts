import { Component } from '@angular/core';
// import { DataLocalService } from 'src/app/services/data-local.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Registro } from '../models/registro.model';
import { FirestoreBaseService } from '../services/firestore-base.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  loading: any;

  path: string = '/usuarios';

  new_registro: Registro = {
    cedula: "",
    nombres: "",
    apellidos: "",
    fecha_entrada: "",
    fecha_salida: "",
  };

  constructor(
    private firebaseService: FirestoreBaseService,
    private barcodeScanner: BarcodeScanner,
    private loadingController: LoadingController,
    // private alertController: AlertController,
    private toastController: ToastController
  ) {
    // this.dataLocal.databaseConn();
  }

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  scan() {
    this.presentLoading();
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        if (!barcodeData.cancelled) {
          let registro = JSON.parse(barcodeData.text);
          this.new_registro.cedula = registro.cedula;
          this.new_registro.nombres = registro.nombres;
          this.new_registro.apellidos = registro.apellidos;
          this.new_registro.fecha_entrada = new Date().toString();

          console.log(registro);
          console.log(this.new_registro);
          this.firebaseService
          .createDoc(this.new_registro, this.path, this.new_registro.cedula)
          .then((resp) => {
            this.loading.dismiss();
            this.presentToast('Registro de Entrada');
          })
          .catch((err) => {
            this.loading.dismiss();
            console.log(err);
          });

        }
      })
      .catch((err) => {
        console.log('Error', err);
        this.loading.dismiss();
        // this.dataLocal.guardarProducto(
        //   'XCBA2M83GFU3RHEX',
        //   'QUINOA',
        //   8,
        //   17.96,

        // );
      });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Guardando Producto',
    });
    await this.loading.present();
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
