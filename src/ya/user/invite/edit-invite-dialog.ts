import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { InviteService } from '@ya-scrum/services';
import { Invite } from '@ya-scrum/models';

@Component({
  templateUrl: './edit-invite-dialog.html',
  styleUrls: ['./edit-invite-dialog.scss'],
})
export class EditInviteDialogComponent implements OnInit {

  loading = false;
  invite: Invite;
  inviteForm: FormGroup;
  errors: string;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<EditInviteDialogComponent>,
    public inviteService: InviteService,
    private _fb: FormBuilder
  ) {
    this.invite = data.invite;
  }

  ngOnInit() {
    this.inviteForm = this._fb.group({
      name: [{ value: this.invite.name, disabled: this.isEdit() }, [<any>Validators.required]],
      email: [{ value: this.invite.email, disabled: this.isEdit() }, [<any>Validators.required]],
    });
  }

  apply() {

    this.invite.name = this.inviteForm.value.name;
    this.invite.email = this.inviteForm.value.email;

    this.loading = true;
    this.errors = undefined;

    this.inviteService.findByEmail(this.invite.email).subscribe(
      invites => {
        if (invites && invites.length > 0) {
          this.errors = 'An Invite has already been sent to this address';
          this.loading = false;
        } else {
          this.inviteService.findOne(this.inviteService.save(this.invite)).subscribe((invite: Invite) => {
            this.invite = invite;
            this.loading = false;
          });
        }
      }
    );
  }

  cancelInvite() {
    this.loading = true;

    this.inviteService.delete(this.invite.$key).subscribe(() => {
      this.loading = false;
      this.dialogRef.close();
    });

  }

  cancel() {
    this.dialogRef.close();
  }

  public getUrl() {
    return this.inviteService.buildUrl(this.invite);
  }

  isEdit(): boolean {
    return this.invite.$key !== undefined;
  }



}
