import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente.model';
import { Image } from 'src/app/models/image.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreBaseService } from 'src/app/services/firestore-base.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  constructor(
    private authServ: AuthService,
    private menuController: MenuController,
    private firebaseService: FirestoreBaseService
  ) {}

  imagen?: string;

  img: Image = {
    file:'',
    path:'',
  };

  cliente: Cliente = {
    email: '',
    foto: '',
    nombre: '',
    uid: '',
  };
  user: Usuario = {
    nombre: '',
    email: '',
    password: '',
  };

  ngOnInit() {}

  open() {
    this.menuController.open('principal');
  }

  async registrar() {
    const res = await this.authServ.registrar(
      this.user.email,
      this.user.password
    );

    if (res.user != null) {
      this.cliente.uid = res.user!.uid;
      this.cliente.nombre = this.user.nombre;
      this.cliente.email = res.user?.email ?? this.user.email;
      const resp = await this.firebaseService.uploadImage(this.img.file, this.img.path, this.cliente.uid);
      this.cliente.foto = resp as string;
      await this.authServ.guardarUser(this.cliente);
    }
  }

  async uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (image) => {
        this.imagen = image.target?.result as string;
        console.log(this.imagen);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    const path = 'Clientes';
    const file = event.target.files[0];
    this.img.file = file;
    this.img.path = path;
    // const res = await this.firebaseService.uploadImage(file, path, name);
    // this.cliente.foto = res as string;
  }

  salir() {
    this.authServ.logout();
  }
}
