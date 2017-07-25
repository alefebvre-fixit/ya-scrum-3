import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendModule } from './trend';

import { TrendComponent } from './trend';


@NgModule({
  imports: [CommonModule, TrendModule ],
  declarations: [],
  exports: [TrendModule],
  entryComponents: [],
  providers: []
})

export class SharedModule { }
export * from './trend';
