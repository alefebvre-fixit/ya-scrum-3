import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewContainerRef } from '@angular/core';
import { TdDialogService } from '@covalent/core';
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
    private dialog: MdDialog,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
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
          } else {
            this.sprint = undefined;
          }
          if (story.productOwnerId) {
            this.userService.findOne(story.productOwnerId).subscribe(user => {
              this.productOwner = user;
              console.log(this.productOwner);
            });
          } else {
            this.productOwner = undefined;
          }



        });
      });
  }

  assignProductOwner() {
  }

  navigateToProductOwner(user: User) {
  }

  editStory(story: Story) {
    const dialogRef = this.dialog.open(StoryEditComponent, {width: '800px'});
    dialogRef.componentInstance.story = this.story;
    dialogRef.afterClosed().subscribe(result => {
      console.log('after close');
    });
  }

  deleteStory(story: Story) {

    if (this.sprint){
      this._dialogService.openConfirm({

        message: 'Do you want to delete current story?',
        viewContainerRef: this._viewContainerRef, 
        title: 'Confirm',
        cancelButton: 'Cancel',
        acceptButton: 'Unassign',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          
        } else {
          // DO SOMETHING ELSE
        }
      });
    }

  }

  unassignStory(story: Story) {

    if (this.sprint){
      this._dialogService.openConfirm({

        message: 'This will un-assign current story from sprint ' + this.sprint.name + ' Do you confirm?',
        viewContainerRef: this._viewContainerRef,
        title: 'Confirm',
        cancelButton: 'Cancel',
        acceptButton: 'Unassign',
      }).afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.storyService.unassignStory(story);

        } else {
          // DO SOMETHING ELSE
        }
      });
    }

  }

  public progressAsPercentage(): number {
    return Story.progressAsPercentage(this.story);
  }

}
