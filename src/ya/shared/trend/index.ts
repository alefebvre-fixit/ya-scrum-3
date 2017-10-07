import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendComponent } from './trend.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [TrendComponent],
  exports: [TrendComponent],
  entryComponents: [],
  providers: []
})

export class TrendModule { }
