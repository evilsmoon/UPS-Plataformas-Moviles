import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  password: string = '';
  cambiar: boolean = false;

  constructor(
    private dataLocal: DataLocalService,
    public toastController: ToastController
  ) {}
  ngOnInit() {}


  validarPassword() {
    this.dataLocal.cambiarPassword(this.password).then((resp) => {
      this.cambiar = resp;
    });

    if (this.cambiar) {
      return this.presentToast(
        `Se cambio Correstamente la app${this.password}`
      );
    }else{
      return this.presentToast(
        `No se cambio Correstamente la app${this.password}`
      );
    }

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'dark',
    });
    toast.present();
  }
}
