import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Producto } from '../models/producto.model';
import { FirestoreBaseService } from '../services/firestore-base.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  constructor(
    private firebaseService: FirestoreBaseService,
        private alertController: AlertController,
        private toastController: ToastController,
  ) {
  }

  searchbar?:string;
  productos: Producto[] = [];
  path: string = '/productos';
  ngOnInit() {
    this.getProductos();
  }
  results:Producto[] = [...this.productos];

  handleChange(event:any) {
    const query = event.target.value.toLowerCase();
    this.results = this.productos.filter(d => d.nombre.toLowerCase().indexOf(query) > -1);
  }

  getProductos() {
    this.productos = [];
    this.firebaseService
      .getCollection<Producto>(this.path)
      .subscribe((resp) => (this.productos = resp));
  }
  async comprarProducto(producto:Producto){
    const alert = await this.alertController.create({
      header: `Producto:${producto.nombre}`,
      subHeader:`Unidades: ${producto.unidades}\nPrecio: $${producto.precio}`,
      message:`Ingrese la cantidad que desee comprar`,
      inputs:[
        {
          name: 'unidad',
          placeholder: '0',
          type:'number',
          min:0,
          max:producto.unidades,
          handler(input) {
              console.log('data');
              console.log('data',input);
          },
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Done!',
          handler: async ( data: any) => {
            if(data.unidad > 0 && data.unidad<=producto.unidades){

              console.log('Selected Information', data.unidad );
            }else{
              const toast = await this.toastController.create({
                message: `Solo tenemos ${producto.unidades}`,
                duration: 2000,
              });
              toast.present();
            }
            
          }
        }
      ]
    });
    await alert.present();
  }

 async mostrarProducto(producto:Producto){
    console.log(producto)

        const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: `Producto:${producto.nombre}`,

      subHeader:`Unidades: ${producto.unidades}\nPrecio: $${producto.precio}`,
      message:`<div>
      <p >${producto.descripcion}</p>
      <img src="${producto.imagen}" height="50px"style="border-radius: 2px">

      </div>`,
    });

    await alert.present();
  }
}
