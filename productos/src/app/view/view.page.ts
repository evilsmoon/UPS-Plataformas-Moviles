import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  constructor(private route: ActivatedRoute) { }
  producto?:Producto;
  ngOnInit() {
    let data:any = this.route.snapshot.queryParams;
    this.producto = data.producto;

  }

}
