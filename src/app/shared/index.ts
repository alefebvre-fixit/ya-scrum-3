import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendModule } from './trend';
import { PropertyTagModule } from './property-tag';
import { SectionTitleModule } from './section-title';


@NgModule({
  imports: [
    CommonModule,
    TrendModule,
    PropertyTagModule,
    SectionTitleModule,
  ],
  declarations: [],
  exports: [
    TrendModule,
    PropertyTagModule,
    SectionTitleModule,
  ],
  entryComponents: [],
  providers: []
})

export class SharedModule { }
