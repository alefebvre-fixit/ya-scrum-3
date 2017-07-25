import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './services';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  entryComponents: [],
  providers: [UserService]
})

export class UserModule { }

export * from './models';
export * from './services';
