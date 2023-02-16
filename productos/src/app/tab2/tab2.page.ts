import { Component } from '@angular/core';
import { Producto } from '../models/producto';
import { DataLocalService } from '../service/data-local.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocal: DataLocalService) {}

  abrirProducto( producto :Producto) {
    this.dataLocal.abrirProducto( producto );
  }
}
