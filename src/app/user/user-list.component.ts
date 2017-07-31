import { Component, OnInit, Input } from '@angular/core';

import { User } from './models';
import { UserService } from './services';
import { Story, StoryService } from '../story';
import { Sprint, SprintService } from '../sprint';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private users: User[];

  constructor(
    private userService: UserService,
    //private storyService: StoryService,
    //private sprintService: SprintService,

  ) {
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe((users: User[]) => {
      this.users = users;
    });
  }

}
