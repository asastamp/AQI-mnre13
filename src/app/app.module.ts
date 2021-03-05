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
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.guard';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';


export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    PinManagerComponent,
    OnePageComponent,
    DashboardComponent,
    LoginComponent
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
    MapModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    })
  ],
  providers: [AppService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
