import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { Page2Component } from './page2.component';
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

const routes: Routes = [{ path: '', component: Page2Component }];

@NgModule({
  declarations: [Page2Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    GooglePlaceModule,
  ],
})
export class Page2Module {}
