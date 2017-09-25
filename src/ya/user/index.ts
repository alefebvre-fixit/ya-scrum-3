import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NguUtilityModule } from 'ngu-utility/ngu-utility.module';

import { UserListComponent } from './user-list.component';
import { UserAccountComponent } from './user-account.component';

import { SignInPageComponent } from './signin/sign-in-page.component';
import { SignUpPageComponent } from './signup/sign-up-page.component';
import { CreateGroupPageComponent } from './group/create-group-page.component';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NguUtilityModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    UserListComponent,
    UserAccountComponent,
    SignInPageComponent,
    SignUpPageComponent,
    CreateGroupPageComponent,
  ],
  exports: [
    UserListComponent,
    UserAccountComponent,
  ],
  entryComponents: [],
  providers: [
  ]
})

export class UserModule { }

export { UserListComponent } from './user-list.component';
export { UserAccountComponent } from './user-account.component';
export { SignInPageComponent } from './signin/sign-in-page.component';
export { SignUpPageComponent } from './signup/sign-up-page.component';
export { CreateGroupPageComponent } from './group/create-group-page.component';


