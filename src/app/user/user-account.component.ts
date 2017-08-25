import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { User } from '../models';
import { UserService } from '../services';

@Component({
  selector: 'user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  account: FormGroup;
  user: User;

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {

    this.userService.findCurrent().subscribe(user => { this.user = user; });

    this.account = new FormGroup({
      role: new FormControl('Some Role'),
    });
  }

  onSubmit() {
    console.log(this.account);
  }



}
