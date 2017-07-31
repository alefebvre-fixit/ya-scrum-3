import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UserService } from './services';
import { UserListComponent } from './user-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
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
