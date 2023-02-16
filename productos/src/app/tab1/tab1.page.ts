import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Producto } from '../models/producto';
import { DataLocalService } from '../service/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(
    private barcodeScanner: BarcodeScanner,
    private dataLocal: DataLocalService
  ) {}

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  ionViewWillEnter() {
    this.scan();
  }

  scan() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        console.log('Barcode data', barcodeData);

        if (!barcodeData.cancelled) {
          let producto = JSON.parse(barcodeData.text);

          this.dataLocal.guardarProducto(
            producto._id,
            producto.nombre,
            producto.tipo,
            producto.marca,
            producto.precio,
            producto.proveedor
          );
        }
      })
      .catch((err) => {
        console.log('Error', err);

        this.dataLocal.guardarProducto(
          'XCBA2M83GFU3RHEX',
          'QUINOA',
          'KARMA',
          'Tesla',
          17.96,
          'Maybe Pte. Ltd'
        );
      });
  }
}
