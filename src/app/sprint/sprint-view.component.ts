import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { MdDialog, MdDialogRef } from '@angular/material';

import { StoryService, SprintService, UserService } from '../services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '../models';
import { SprintEditComponent } from './sprint-edit.component';
import { SprintStorySelectorComponent } from './story/sprint-story-selector.component';

@Component({
  selector: 'sprint-view',
  templateUrl: './sprint-view.component.html',
  styleUrls: ['./sprint-view.component.scss'],
})
export class SprintViewComponent implements OnInit {

  public sprint: Sprint;
  public stories: Story[];

  public progress: SprintProgress;
  public progressHistory: SprintProgress[];

  constructor(
    private route: ActivatedRoute,
    private sprintService: SprintService,
    public storyService: StoryService,
    private userService: UserService,
    private dialog: MdDialog
  ) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.sprintService.findOne(id).subscribe(sprint => {
          this.sprint = sprint;

          this.storyService.findBySprintId(sprint.$key).subscribe(stories => {
            this.stories = stories;
            this.progressHistory = this.sprintService.getSprintProgressHistory(this.sprint, this.stories);
          });

        });
      });
  }

  startNewDailyMeeting() {
    this.sprintService.startNewDailyMeeting(this.sprint, this.stories);
  }

  assignProductOwner() {
  }

  navigateToProductOwner(user: User) {
  }

  editSprint(sprint: Sprint) {
    const dialogRef = this.dialog.open(SprintEditComponent, { width: '800px' });
    dialogRef.componentInstance.sprint = this.sprint;
    dialogRef.afterClosed().subscribe(result => {
      console.log('after close');
    });
  }

  selectStories(stories: Story[]) {
    this.sprintService.assigStoriesToSprint(this.sprint, stories);
  }

  addStory() {
    const dialogRef = this.dialog.open(SprintStorySelectorComponent, { width: '1024px' });
    dialogRef.componentInstance.sprint = this.sprint;
    dialogRef.afterClosed().subscribe((stories: Story[]) => {
      if (stories && stories.length > 0) {
        this.sprintService.assigStoriesToSprint(this.sprint, stories);
      }
    });
  }



}
