import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import { Producto } from 'src/app/models/producto.model';
import { FirestoreBaseService } from 'src/app/services/firestore-base.service';

@Component({
  selector: 'app-set-producto',
  templateUrl: './set-producto.component.html',
  styleUrls: ['./set-producto.component.scss'],
})
export class SetProductoComponent implements OnInit {
  nuevo: boolean = false;
  modif: boolean = false;
  loading: any;

  new_producto: Producto = {
    id: "",
    cedula: "",
    nombres: "",
    apellidos: "",
    fecha_entrada: new Date(),
    fecha_salida: new Date(),
    isRegister: true,
  };

  newImage: string = '';

  productos?: Producto[];

  path: string = '/productos';
  constructor(
    private menuController: MenuController,
    private firebaseService: FirestoreBaseService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getProductos();
  }

  open() {
    this.menuController.open('principal');
  }

  modificar(id: string) {
    console.log('modificar');
    this.firebaseService
      .updateDoc(this.new_producto, this.path, id)
      .then((resp) => this.presentToast('Producto Modificado'))
      .catch((errr) => this.presentToast('No se pudo modificar'));
    this.nuevo = false;
    this.modif = false;
  }
  async eliminar(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Advertencia',
      message: 'Seguro que desea eleminar este producto',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'SI',
          id: 'confirm-button',
          handler: () => {
            this.firebaseService
              .deleteDoc(this.path, id)
              .then((resp) => this.presentToast('Producto Elminado'))
              .catch((errr) => this.presentToast('No se pudo eliminar'));
          },
        },
      ],
    });

    await alert.present();
  }
  add() {
    this.presentLoading();
    this.new_producto.id = this.firebaseService.getID();
    this.new_producto.imagen = this.newImage;

    console.log(this.new_producto);
    this.firebaseService
      .createDoc(this.new_producto, this.path, this.new_producto.id)
      .then((resp) => {
        this.loading.dismiss();
        this.nuevo = false;
        this.modif = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  new_register() {
    if (!this.nuevo) {
      this.nuevo = true;
      this.modif = true;
      this.new_producto = {
        id: '',
        nombre: '',
        precio: 0.0,
        stock: 0,
        imagen: '',
        fecha: new Date(),
      };
    } else {
      this.nuevo = false;
    }
  }

  getProductos() {
    this.productos = [];
    this.firebaseService
      .getCollection<Producto>(this.path)
      .subscribe((resp) => (this.productos = resp));
  }

  async uploadImage(event: any) {
    // if (event.target.files && event.target.files[0]) {
    //   const reader = new FileReader();
    //   reader.onload = ((image) => {
    //     this.newImage = image.target?.result as string ;
    //     console.log(this.newImage);
    //   });
    //   reader.readAsDataURL(event.target.files[0]);
    // }
    const path = 'Productos';
    const name = this.new_producto.nombre;
    const file = event.target.files[0];
    const res = await this.firebaseService.uploadImage(file, path, name);
    this.new_producto.imagen = res as string;

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
