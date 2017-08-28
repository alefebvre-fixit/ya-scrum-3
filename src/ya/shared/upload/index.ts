import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule
  ],
  declarations: [UploadComponent],
  exports: [UploadComponent],
  entryComponents: [],
  providers: []
})

export class UploadModule { }
