import { Component ,OnInit} from '@angular/core';
import { Observable } from 'rxjs';

import { DataJSONService } from '../services/data-json.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuarios?:Array<any>;;

  constructor(public data:DataJSONService) {

  }
// 
  ngOnInit(){
    this.data.getUsuarios().subscribe((resp:any)=>{
      this.usuarios = resp['record']['profesionales'];
    });
  }
  abrirUsuario(user:any){
    this.data.abrirUsuario(user);
  }
}
