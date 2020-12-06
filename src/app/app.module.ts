import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MomentModule } from 'ngx-moment';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { InformationTubeComponent } from './information-tube/information-tube.component';

@NgModule({
  declarations: [AppComponent, InformationTubeComponent],
  imports: [BrowserModule, HttpClientModule, MomentModule],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
