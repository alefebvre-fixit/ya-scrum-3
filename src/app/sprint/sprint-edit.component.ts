import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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

  public typeList: any;
  public priorityList: any;

  constructor(
    public dialogRef: MdDialogRef<SprintEditComponent>,
    public sprintService: SprintService,
    public storyService: StoryService,
    public userService: UserService,
    private _fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.typeList = this.storyService.getStoryTypes();
    this.priorityList = this.storyService.getStoryPriorities();

    this.sprintForm = this._fb.group({
      name: [this.sprint.name, [<any>Validators.required]],
      description: [this.sprint.description, [<any>Validators.required]],
    });
  }

  apply() {

    this.sprint.name = this.sprintForm.value.name;
    this.sprint.description = this.sprintForm.value.description;

    this.sprintService.save(this.sprint);

    this.dialogRef.close(true);

  }

  cancel() {
    this.dialogRef.close(true);
  }


}
