import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { StoryService, SprintService, UserService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '@ya-scrum/models';

@Component({
  selector: 'story-progress-edit',
  templateUrl: './progress-edit.component.html',
  styleUrls: ['./progress-edit.component.scss'],
  providers: [ UserService ]
})
export class ProgressEditComponent implements OnInit {

  public story: Story;
  public progress: StoryProgress;

  public storyForm: FormGroup; // our model driven form


  constructor(
    public dialogRef: MdDialogRef<ProgressEditComponent>,
    public sprintService: SprintService,
    public storyService: StoryService,
    private _fb: FormBuilder
  ) {
  }

  ngOnInit() {

    this.storyForm = this._fb.group({
      daily: [this.progress.daily, [<any>Validators.required]],
    });
  }

  apply() {

    this.progress = this.storyService.setDailyProgress(this.story, this.progress, this.storyForm.value.daily);
    this.storyService.assignDailyProgress(this.story, this.progress);
    this.storyService.save(this.story);

    this.dialogRef.close(true);

  }

  cancel() {
    this.dialogRef.close(true);
  }


}
