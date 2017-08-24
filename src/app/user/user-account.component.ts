import { Component, OnInit, Input } from '@angular/core';

import { User } from '../models';
import { UserService } from '../services';

@Component({
  selector: 'user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

}
