import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';

import { StoryService, SprintService, UserService } from '../services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '../models';

@Component({
  selector: 'story-edit',
  templateUrl: './story-edit.dialog.html',
  styleUrls: ['./story-edit.dialog.scss'],
})
export class StoryEditDialogComponent implements OnInit {

  story: Story;
  storyForm: FormGroup;
  typeList: any;
  priorityList: any;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<StoryEditDialogComponent>,
    public sprintService: SprintService,
    public storyService: StoryService,
    public userService: UserService,
    private _fb: FormBuilder
  ) {
    this.story = data.story;
  }

  ngOnInit() {

    this.typeList = this.storyService.getStoryTypes();
    this.priorityList = this.storyService.getStoryPriorities();

    this.storyForm = this._fb.group({
      name: [this.story.name, [<any>Validators.required]],
      description: [this.story.description, [<any>Validators.required]],
      criterias: [this.story.acceptanceCriterias, [<any>Validators.required]],
      comment: [this.story.comment, [<any>Validators.required]],
      type: [this.story.type, [<any>Validators.required]],
      priority: [this.story.priority, [<any>Validators.required]],
      estimate: [this.story.estimate],

    });
  }

  assignProductOwner() {
    /*
    let selectorModal = this.modalCtrl.create(ProductOwnerSelectorPage, { storyId: this.story.$key });
    selectorModal.present();
    */
  }

  navigateToProductOwner(user: User) {

  }

  apply() {

    this.story.name = this.storyForm.value.name;
    this.story.description = this.storyForm.value.description;
    this.story.acceptanceCriterias = this.storyForm.value.criterias;
    this.story.comment = this.storyForm.value.comment;
    this.story.priority = this.storyForm.value.priority;
    this.story.estimate = this.storyForm.value.estimate;
    this.story.type = this.storyForm.value.type;

    this.dialogRef.close(this.storyService.save(this.story));

  }

  cancel() {
    this.dialogRef.close();
  }


}
