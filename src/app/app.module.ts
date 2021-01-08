import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { InformationTubeComponent } from './information-tube/information-tube.component';
import { ContentComponent } from './content/content.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { FooterOnepageComponent } from './footer-onepage/footer-onepage.component';

import { PinManagerComponent } from './pages/pin-manager/pin-manager.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    InformationTubeComponent,
    ContentComponent,
    PinManagerComponent,
    HomeComponent,
    MapComponent,
    HeaderComponent,
    FooterOnepageComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
