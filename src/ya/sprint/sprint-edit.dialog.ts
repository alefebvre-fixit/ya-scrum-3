import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { MD_DIALOG_DATA } from '@angular/material';

import { StoryService, SprintService, UserService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '@ya-scrum/models';

@Component({
  templateUrl: './sprint-edit.dialog.html',
  styleUrls: ['./sprint-edit.dialog.scss'],
})
export class SprintEditDialogComponent implements OnInit {

  sprint: Sprint;
  users: Observable<User[]>;
  scrummaster: User;
  sprintForm: FormGroup;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<SprintEditDialogComponent>,
    public sprintService: SprintService,
    public userService: UserService,
    private _fb: FormBuilder
  ) {
    this.sprint = data.sprint;
  }

  ngOnInit() {

    this.users = this.userService.findAll();

    if (this.sprint.scrumMasterId) {
      this.userService.findOne(this.sprint.scrumMasterId).subscribe(user => this.scrummaster = user);
    }

    this.sprintForm = this._fb.group({
      name: [this.sprint.name, [<any>Validators.required]],
      description: [this.sprint.description, [<any>Validators.required]],
      velocity: [this.sprint.velocity, [<any>Validators.required] ],
      duration: [this.sprint.duration, [<any>Validators.required]],
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
