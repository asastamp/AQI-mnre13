import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InformationTubeComponent } from './information-tube/information-tube.component';
import { OnePageContentComponent } from './one-page-content.component';

import { MapModule } from '../shared/map/map.module';

@NgModule({
  declarations: [
    HeaderComponent,
    InformationTubeComponent,
    FooterComponent,
    OnePageContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    MapModule
  ],
  exports: [
    HeaderComponent,
    InformationTubeComponent,
    FooterComponent,
    OnePageContentComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OnePageContentModule {}
