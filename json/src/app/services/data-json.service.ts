import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataJSONService {

  constructor(private http:HttpClient,private navCtrl: NavController) { }

  URL:string = 'https://api.jsonbin.io/v3/b/63d064a9ace6f33a22c753d0'; 
  
 getUsuarios (){
  return this.http.get(`${this.URL}`);
 } 

 

 abrirUsuario(usuario:any){
  this.navCtrl.navigateForward(`/view`,{
    "queryParams":{
      usuario
    }
  });
 }
}
