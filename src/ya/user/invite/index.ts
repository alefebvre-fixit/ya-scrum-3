import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NguUtilityModule } from 'ngu-utility/ngu-utility.module';

import { PendingInviteListComponent } from './pending-invite-list.component';
import { SharedModule } from '../../shared';
import { EditInviteDialogComponent } from './edit-invite-dialog';

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
    PendingInviteListComponent,
    EditInviteDialogComponent
  ],
  exports: [
    PendingInviteListComponent,
  ],
  entryComponents: [
    EditInviteDialogComponent
  ],
  providers: [

  ]
})

export class InviteModule { }


