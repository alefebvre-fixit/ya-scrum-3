import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { StoryService, SprintService, UserService } from '../services/index';
import { Story, StoryProgress, Sprint, User } from '../models/index';

import { MdDialog, MdDialogRef } from '@angular/material';

import { StoryEditComponent } from './story-edit.component';
import { StoryCardComponent } from './story-card.component';

@Component({
  selector: 'story-view',
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.css']
})
export class StoryViewComponent implements OnInit {

  public story: Story;
  public progress: StoryProgress;


  public sprint: Sprint;
  public productOwner: User;


    // Doughnut
  public doughnutChartLabels: string[] = ['previous', 'daily', 'remaining'];
  public doughnutChartData: number[] = [0, 0, 1];
  public doughnutChartType: string = 'doughnut';
  public colors: any = [{ backgroundColor: ["#15B7B9", "#10DDC2", "#F5F5F5"] }];
  public options = {
    tooltips: {
      enabled: false
    }
  };

  constructor(
    private route: ActivatedRoute,
    public sprintService: SprintService,
    public storyService: StoryService,
    public userService: UserService,
    public dialog: MdDialog
  ) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.storyService.findOne(id).subscribe(story => {
          this.story = story;

          this.displayProgressForDay(1);

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
    /*
    let selectorModal = this.modalCtrl.create(ProductOwnerSelectorPage, { storyId: this.story.$key });
    selectorModal.present();
    */
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


  public displayProgressForDay(day: number) {
    let progress: StoryProgress = Story.getProgress(this.story, day);

    if (progress === undefined) {
      progress = Story.createProgress(this.story, day);
      Story.setProgress(this.story, progress);

      console.log("Applying progress to story");
      console.log(this.story);
      
      this.storyService.calculateProgress(this.story);
    }

    this.progress = progress;
    this.updateChart(progress);
  }

    public updateChart(progress: StoryProgress) {
    this.doughnutChartData = [progress.previous, progress.daily, progress.remaining];
  }

}
