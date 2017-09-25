import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule
  ],
  declarations: [
    PageComponent,
  ],
  exports: [
    PageComponent,
  ],
  entryComponents: [],
  providers: []
})

export class PageModule { }
