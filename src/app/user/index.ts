import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NguUtilityModule } from 'ngu-utility/ngu-utility.module'; // <-- import the module

import { UserService } from './services';
import { UserListComponent } from './user-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NguUtilityModule
  ],
  declarations: [
    UserListComponent
  ],
  exports: [
    UserListComponent
  ],
  entryComponents: [],
  providers: [
    UserService
  ]
})

export class UserModule { }

export * from './models';
export * from './services';
export * from './user-list.component';
