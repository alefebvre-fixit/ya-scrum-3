import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent, SectionTitleHighlight } from './section-title.component';
import { MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule
  ],
  declarations: [
    SectionTitleComponent,
     SectionTitleHighlight
    ],
  exports: [
    SectionTitleComponent,
     SectionTitleHighlight
    ],
  entryComponents: [],
  providers: []
})

export class SectionTitleModule { }
