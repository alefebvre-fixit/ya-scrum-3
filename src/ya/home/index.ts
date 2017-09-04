import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxCroppieModule } from 'ngx-croppie';

import { HomePageComponent } from './home-page.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCroppieModule
  ],
  declarations: [
    HomePageComponent,
  ],
  exports: [
    HomePageComponent,
  ],
  entryComponents: [],
  providers: [
  ]
})

export class HomeModule { }

export { HomePageComponent } from './home-page.component';
