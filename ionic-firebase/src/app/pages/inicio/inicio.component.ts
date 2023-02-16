import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto.model';
import { FirestoreBaseService } from 'src/app/services/firestore-base.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  constructor(
    private menuController: MenuController,
    private firebaseService: FirestoreBaseService
  ) {

  }
  path: string = '/productos';

  productos?: Producto[];

  open() {
    this.menuController.open('principal');
  }
 ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.productos = [];
    this.firebaseService
      .getCollection<Producto>(this.path)
      .subscribe((resp) => (this.productos = resp));
  }
}
