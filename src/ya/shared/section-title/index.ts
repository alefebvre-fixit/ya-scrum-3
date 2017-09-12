import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent, SectionTitleHighlight, SectionButtonBar } from './section-title.component';
import { MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule
  ],
  declarations: [
    SectionTitleComponent,
     SectionTitleHighlight,
     SectionButtonBar
    ],
  exports: [
    SectionTitleComponent,
     SectionTitleHighlight,
     SectionButtonBar
    ],
  entryComponents: [],
  providers: []
})

export class SectionTitleModule { }
