import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { DataLocalService } from '../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  lat?: number;
  lon?: number;
  
  constructor(
    private barcodeScanner: BarcodeScanner,
    private dataLocal: DataLocalService,
    private geolocation: Geolocation
  ) {}
  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };
  scan() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
      })
      .catch((err) => {
        console.log('Error getting location ', err);
      });
    // this.presentAlert();

    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        console.log('Barcode data', barcodeData);

        if (!barcodeData.cancelled) {
          // this.dataLocal.saveRegister('QRCode', 'geo:40.73151796986687,-74.06087294062502');
          const data = barcodeData.text.split('-');
          this.dataLocal.saveRegister(
            data[0],
            data[1],
            data[2],
            this.lat!,
            this.lon!
          );
        }
      })
      .catch((err) => {
        console.log('Error', err);

        // this.dataLocal.saveRegister('QRCode', 'geo:40.73151796986687,-74.06087294062502');
      });
  }
}
