import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { MdDialog, MdDialogRef } from '@angular/material';

import { StoryService, SprintService, UserService } from '../services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '../models';
import { SprintEditComponent } from './sprint-edit.component';

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
            const burndown = this.sprintService.generateBurndowData(sprint, stories);
            this.lineChartData = burndown.datas;
            this.lineChartLabels = burndown.labels;
          });

          this.storyService.findNewStories().subscribe(stories => {
            this.allStories = stories;
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


  public lineChartData: Array<any> = [
    { data: [], label: 'Actual' },
    { data: [], label: 'Ideal' },
  ];

  public lineChartLabels: Array<any>;
  
  
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';

}
