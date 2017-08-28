import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendModule } from './trend';
import { UploadModule } from './upload';
import { PropertyTagModule } from './property-tag';
import { SectionTitleModule } from './section-title';


@NgModule({
  imports: [
    CommonModule,
    TrendModule,
    PropertyTagModule,
    SectionTitleModule,
    UploadModule,
  ],
  declarations: [],
  exports: [
    TrendModule,
    PropertyTagModule,
    SectionTitleModule,
    UploadModule,
  ],
  entryComponents: [],
  providers: []
})

export class SharedModule { }
