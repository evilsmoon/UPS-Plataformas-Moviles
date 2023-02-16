import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Registro } from '../models/registro.model';
import { FirestoreBaseService } from '../services/firestore-base.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  loading: any;

  path: string = '/usuarios';

  new_registro: Registro = {
    cedula: '',
    nombres: '',
    apellidos: '',
  };
  new_registroDB?: Registro;
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
          // this.new_registro.apellidos = registro.apellidos;
          this.new_registro.fecha_salida = new Date().toString();

          
          this.firebaseService.getDoc<Registro>(this.path,registro.cedula).subscribe((resp)=>{
            this.new_registro.apellidos =resp!.apellidos;
            this.new_registro.fecha_entrada =resp?.fecha_entrada;
          });
          console.log(this.new_registro);
          this.firebaseService
          .updateDoc(this.new_registro, this.path, registro.cedula)
          .then((resp) => {
            this.loading.dismiss();
            this.presentToast('Registro de Salida');
          })
          .catch((errr) => this.presentToast('No se pudo modificar'));
          this.loading.dismiss();
        }
      })
      .catch((err) => {
        this.loading.dismiss();
        console.log('Error', err);
      });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Guardando Registro',
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
