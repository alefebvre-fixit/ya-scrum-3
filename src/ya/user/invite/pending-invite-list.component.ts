import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Invite } from '@ya-scrum/models';
import { InviteService } from '@ya-scrum/services';
import { EditInviteDialogComponent } from './edit-invite-dialog';

@Component({
  selector: 'ya-pending-invite-list',
  templateUrl: './pending-invite-list.component.html',
  styleUrls: ['./pending-invite-list.component.scss']
})
export class PendingInviteListComponent implements OnInit {


  invites: Observable<Invite[]>;

  constructor(
    private InviteService: InviteService,
    private dialog: MdDialog,
  ) {
  }

  ngOnInit(): void {
    this.invites = this.InviteService.findAll();
  }

  addInvite() {
    this.editInvite(this.InviteService.instanciate());
  }


  editInvite(invite: Invite) {
    const dialogRef = this.dialog.open(EditInviteDialogComponent, {
      panelClass: 'medium-dialog',
      data: {
        invite: invite
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('after close');
    });
  }





}
