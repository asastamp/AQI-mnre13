import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MapComponent } from './map.component';
import { PinComponent } from './pin/pin.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  declarations: [
    MapComponent,
    PinComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    MapComponent,
    PinComponent,
    TooltipComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MapModule {}
