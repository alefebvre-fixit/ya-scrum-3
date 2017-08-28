import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyTagComponent } from './property-tag.component';
import { MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule
  ],
  declarations: [PropertyTagComponent],
  exports: [PropertyTagComponent],
  entryComponents: [],
  providers: []
})

export class PropertyTagModule { }
