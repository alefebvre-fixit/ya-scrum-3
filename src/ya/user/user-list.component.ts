import { Component, OnInit, Input } from '@angular/core';

import { User } from '@ya-scrum/models';
import { UserService } from '@ya-scrum/services';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe((users: User[]) => {
      this.users = users;
    });
  }

}
