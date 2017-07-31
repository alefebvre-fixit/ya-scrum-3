import { Component, OnInit, Input } from '@angular/core';

import { User } from './models';
import { UserService } from './services';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private users: User[];

  constructor(private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe((users: User[]) => {
      this.users = users;
    });
  }

}
