import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendComponent } from './trend.component';
import { MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule
  ],
  declarations: [TrendComponent],
  exports: [TrendComponent],
  entryComponents: [],
  providers: []
})

export class TrendModule { }

export * from './trend.component';
