import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { MdDialog, MdDialogRef } from '@angular/material';

import { StoryService, SprintService, UserService } from '../services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '../models';

import { StoryEditComponent } from './story-edit.component';
import { StoryCardComponent } from './story-card.component';

@Component({
  selector: 'story-view',
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.scss'],
})
export class StoryViewComponent implements OnInit {

  public story: Story;
  public progress: StoryProgress;

  public sprint: Sprint;
  public productOwner: User;


  constructor(
    private route: ActivatedRoute,
    private sprintService: SprintService,
    private storyService: StoryService,
    private userService: UserService,
    private dialog: MdDialog
  ) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.storyService.findOne(id).subscribe(story => {
          this.story = story;

          if (story.sprintId) {
            this.sprintService.findOne(story.sprintId).subscribe(sprint => {
              this.sprint = sprint;
            });
          }
          if (story.productOwnerId) {
            this.userService.findOne(story.productOwnerId).subscribe(user => {
              this.productOwner = user;
              console.log(this.productOwner);
            });
          }
        });
      });
  }

  assignProductOwner() {
  }

  navigateToProductOwner(user: User) {

  }

  editStory(story: Story) {
    console.log('editStory');

    const dialogRef = this.dialog.open(StoryEditComponent);
    dialogRef.componentInstance.story = this.story;
    dialogRef.afterClosed().subscribe(result => {
      console.log('after close');
    });

  }

  public progressAsPercentage(): number {
    return Story.progressAsPercentage(this.story);
  }

}
