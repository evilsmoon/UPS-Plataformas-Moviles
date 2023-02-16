import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// @ NAVITES

import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    BarcodeScanner,
    NativeStorage,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
