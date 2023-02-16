import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataLocalService } from '../services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  constructor(private dataLocal: DataLocalService, public router:Router) {}
  ngOnInit() {
    this.dataLocal.createCredencial();
  }
  email: string = "admin";
  password: string = "admin";

  validar() {
    this.dataLocal.cambiarPassword(this.password);
  }

  cerrarSession(){
    return this.router.navigate(['']);
  }
}
