import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendModule } from './trend';
import { PropertyTagModule } from './property-tag';


@NgModule({
  imports: [
    CommonModule,
    TrendModule,
    PropertyTagModule,
  ],
  declarations: [],
  exports: [
    TrendModule,
    PropertyTagModule,
  ],
  entryComponents: [],
  providers: []
})

export class SharedModule { }
