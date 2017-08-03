import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { MdDialog, MdDialogRef } from '@angular/material';

import { StoryService, SprintService, UserService } from '../services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '../models';

@Component({
  selector: 'sprint-view',
  templateUrl: './sprint-view.component.html',
  styleUrls: ['./sprint-view.component.scss'],
})
export class SprintViewComponent implements OnInit {

  public sprint: Sprint;
  public stories: Story[];
  public allStories: Story[];
  public progress: SprintProgress;

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
          });

          this.storyService.findAll().subscribe(stories => {
            this.allStories = stories;
          });

        });
      });
  }

  assignProductOwner() {
  }

  navigateToProductOwner(user: User) {

  }

  editStory(story: Story) {
    console.log('editStory');

    // const dialogRef = this.dialog.open(StoryEditComponent);
    // dialogRef.componentInstance.story = this.story;
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('after close');
    // });

  }

  selectStories(stories: Story[]) {
    this.sprintService.assigStoriesToSprint(this.sprint, stories);
  }


}
