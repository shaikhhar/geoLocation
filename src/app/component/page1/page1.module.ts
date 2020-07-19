import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { Page1RoutingModule } from './page1-routing.module';
import { Page1Component } from './page1.component';
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [Page1Component],
  imports: [
    CommonModule,
    AgmCoreModule,
    Page1RoutingModule,
    FormsModule,
    GooglePlaceModule,
  ],
})
export class Page1Module {}
