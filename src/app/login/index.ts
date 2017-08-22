import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginPageComponent
  ],
  exports: [
    LoginPageComponent
  ],
  entryComponents: [],
  providers: [
  ]
})

export class LoginModule { }

export { LoginPageComponent } from './login-page.component';
