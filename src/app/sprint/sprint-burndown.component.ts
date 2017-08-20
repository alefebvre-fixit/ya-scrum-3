import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { MdDialog, MdDialogRef } from '@angular/material';

import { StoryService, SprintService, UserService } from '../services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '../models';

import * as c3 from 'c3';

@Component({
  selector: 'sprint-burndown',
  templateUrl: './sprint-burndown.component.html',
  styleUrls: ['./sprint-burndown.component.scss'],
})
export class SprintBurndownComponent implements OnInit, OnChanges, AfterViewInit {


  @Input() sprint: Sprint;
  @Input() stories: Story[];

  private chart;

  constructor(
    private sprintService: SprintService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChart();
  }

  ngAfterViewInit() {
    this.updateChart();
  }

  ngOnInit(): void {
    this.updateChart();
  }


  private updateChart() {
    if (this.chart === undefined) {
      this.createChart();
    } else {
      this.chart.load({
        columns: this.generateChartColumns(),
      });
    }
  }

  createChart() {

    if (this.sprint && this.stories) {

      this.chart = c3.generate({
        bindto: '#burndownChart',
        data: {
          xs: {
            'actual': 'x1',
            'ideal': 'x2',
          },
          colors: {
            actual: '#03a9f4',
            ideal: '#cdcdcd',
          },
          types: {
              ideal: 'area-spline',
              actual: 'area-spline',
          },
          columns: this.generateChartColumns(),
        },
        legend: {
          show: false
        },
        point: {
          show: false
        }
      });
    }

  }

  generateChartColumns(): any {
    const columns = [];

    columns[0] = ['x1'].concat(this.sprintService.generateLabels(this.sprint));
    columns[1] = ['x2'].concat(this.sprintService.generateLabels(this.sprint));

    columns[2] = ['ideal'].concat(this.sprintService.generateIdealCurve(this.sprint));
    columns[3] = ['actual'].concat(this.sprintService.generateActualCurve(this.sprint, this.stories));

    return columns;
  }


}
