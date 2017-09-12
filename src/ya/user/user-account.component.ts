import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { User } from '@ya-scrum/models';
import { UserService } from '@ya-scrum/services';

@Component({
  selector: 'user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  accountForm: FormGroup;
  user: User;

  constructor(
    private userService: UserService,
    private _fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.userService.findCurrent().subscribe(user => { this.user = user; 
      this.accountForm = this._fb.group({
        role: [this.user.role, [<any>Validators.required]],
        team: [this.user.team, [<any>Validators.required]],
      });
    });

  }

  onSubmit() {

    this.user.role = this.accountForm.value.role;
    this.user.team = this.accountForm.value.team;

    this.userService.save(this.user);
  }



}
