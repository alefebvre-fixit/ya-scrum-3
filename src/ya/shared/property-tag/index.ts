import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyTagComponent } from './property-tag.component';
import { HighlightTagComponent } from './highlight-tag.component';
import { MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule
  ],
  declarations: [PropertyTagComponent, HighlightTagComponent],
  exports: [PropertyTagComponent, HighlightTagComponent],
  entryComponents: [],
  providers: []
})

export class PropertyTagModule { }
