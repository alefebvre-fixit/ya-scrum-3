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

  invite: Invite;
  inviteForm: FormGroup;

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
      name: [{value: this.invite.name, disabled: this.isEdit()}, [<any>Validators.required]],
      email: [{value: this.invite.email, disabled: this.isEdit()}, [<any>Validators.required]],
    });

  }

  apply() {

    this.invite.name = this.inviteForm.value.name;
    this.invite.email = this.inviteForm.value.email;


    //Validation!!!
    this.inviteService.save(this.invite);

    this.dialogRef.close();

  }

  cancel() {
    this.dialogRef.close();
  }


  isEdit(): boolean {
    console.log(this.invite.$key);
    return this.invite.$key !== undefined;
  }
}
