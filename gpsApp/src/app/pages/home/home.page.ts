import { Component, OnInit } from '@angular/core';
import { AlertController,NavController } from "@ionic/angular";
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private alertController: AlertController, 
    private geolocation: Geolocation,
    private datalocal :DataLocalService,
    ) { }

  username:string = '';
  password:string = '';

  lat?: number;
  lon?: number;
  ngOnInit() {
  }

  gps() {

    this.geolocation.getCurrentPosition().then(resp => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
    }).catch(err => {
      console.log("Error getting location ", err);
    });
    this.presentAlert();
  }

  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Ubicacion',
      subHeader: "Ubicacion actual del Gps",
      message: `Latitud ${this.lat} - Longitud ${this.lon}`,
      buttons: [      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'ok',
        handler: () => {
          if (this.lat != null, this.lon != null) {
            this.datalocal.saveCoords(this.lat!,this.lon!);
          }
        }
        }
      ]


    });

    alert.present();

  }

  credencial(){
    this.datalocal.saveCrendencial(this.username,
      this.password);
  }
}
