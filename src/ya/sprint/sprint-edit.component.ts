import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { StoryService, SprintService, UserService } from '../services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '../models';

@Component({
  selector: 'sprint-edit',
  templateUrl: './sprint-edit.component.html',
  styleUrls: ['./sprint-edit.component.scss'],
})
export class SprintEditComponent implements OnInit {

  public sprint: Sprint;
  public sprintForm: FormGroup; // our model driven form

  public users: Observable<User[]>;
  public scrummaster: User;

  constructor(
    public dialogRef: MdDialogRef<SprintEditComponent>,
    public sprintService: SprintService,
    public userService: UserService,
    private _fb: FormBuilder
  ) {
  }

  ngOnInit() {

    this.users = this.userService.findAll();

    if (this.sprint.scrumMasterId) {
      this.userService.findOne(this.sprint.scrumMasterId).subscribe(user => this.scrummaster = user);
    }

    this.sprintForm = this._fb.group({
      name: [this.sprint.name, [<any>Validators.required]],
      description: [this.sprint.description, [<any>Validators.required]],
      velocity: [this.sprint.velocity],
      duration: [this.sprint.duration],
      startDate: [this.sprint.startDate],
      scrummaster: [this.scrummaster],
    });

  }

  apply() {

    this.sprint.name = this.sprintForm.value.name;
    this.sprint.description = this.sprintForm.value.description;
    this.sprint.velocity = this.sprintForm.value.velocity;
    this.sprint.duration = this.sprintForm.value.duration;
    this.sprint.startDate = this.sprintForm.value.startDate;
    if (this.sprintForm.value.scrummaster) {
      this.sprint.scrumMasterId = this.sprintForm.value.scrummaster.$key;
    }

    this.sprintService.save(this.sprint);

    this.dialogRef.close(true);

  }

  cancel() {
    this.dialogRef.close(true);
  }

  displayFn(user: User): string {
    return user ? user.name : '';
  }


}
