import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private dataLocal: DataLocalService,
    public router: Router,
    public toastController: ToastController
  ) {}
  email: string = 'proveedor';
  password: string = 'admin';
  loading: any;
  inicioSession: boolean = false;
  ngOnInit() {
    this.dataLocal.createCredencial();
  }

  OnSubmitLogin() {
    this.dataLocal.validar(this.email, this.password).then((resp) => {
      this.inicioSession = resp;
    });
    if (this.inicioSession) {
      return this.router.navigate(['/app/tabs']);
    } else {
      return this.presentToast(
        `Los datos son Incorrectos o no existe el Usuario ${this.email} ${this.password}`
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
