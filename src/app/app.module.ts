import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';


import { PinManagerComponent } from './pages/pin-manager/pin-manager.component';
import { OnePageComponent } from './pages/one-page/one-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OnePageContentModule } from './components/one-page-content/one-page-content.module';
import { MapModule } from './components/shared/map/map.module';

@NgModule({
  declarations: [
    AppComponent,
    PinManagerComponent,
    OnePageComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    OnePageContentModule,
    MapModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
