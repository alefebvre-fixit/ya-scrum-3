import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { MdDialog, MdDialogRef } from '@angular/material';

import { StoryService, SprintService, UserService } from '../services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '../models';
import { SprintEditComponent } from './sprint-edit.component';

@Component({
  selector: 'sprint-burndown',
  templateUrl: './sprint-burndown.component.html',
  styleUrls: ['./sprint-burndown.component.scss'],
})
export class SprintBurndownComponent implements OnInit, OnChanges {

  @Input() sprint: Sprint;
  @Input() stories: Story[];

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

  constructor(
    private route: ActivatedRoute,
    private sprintService: SprintService,
    public storyService: StoryService,
    private userService: UserService,
    private dialog: MdDialog
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateBurndowChart();
  }

  ngOnInit() {
    this.generateBurndowChart();
  }

  generateBurndowChart() {
    if (this.sprint && this.stories) {
      const burndown = this.sprintService.generateBurndowData(this.sprint, this.stories);
      this.lineChartData = burndown.datas;
      this.lineChartLabels = burndown.labels;
    }
  }




}
