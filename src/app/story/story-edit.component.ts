import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { StoryService, SprintService, UserService } from '../services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '../models';

@Component({
  selector: 'story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.scss'],
})
export class StoryEditComponent implements OnInit {

  public story: Story;
  public storyForm: FormGroup; // our model driven form

  public typeList: any;
  public priorityList: any;

  constructor(
    public dialogRef: MdDialogRef<StoryEditComponent>,
    public sprintService: SprintService,
    public storyService: StoryService,
    public userService: UserService,
    private _fb: FormBuilder
  ) {
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
