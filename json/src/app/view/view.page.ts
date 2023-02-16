import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  constructor(private route: ActivatedRoute) {}
  user:any;
  ngOnInit() {
    let data: any = this.route.snapshot.queryParams;
    this.user = data.usuario;
  }
}
