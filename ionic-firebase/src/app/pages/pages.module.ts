import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InicioComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
  ]
})
export class PagesModule { }
