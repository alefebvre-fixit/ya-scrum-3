import { Component, OnInit, Input, OnChanges, ViewChild, SimpleChanges, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';

import { StoryService, SprintService, UserService } from '@ya-scrum/services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '@ya-scrum/models';

import * as d3 from 'd3';
import * as c3 from 'c3';

@Component({
  selector: 'story-progress-view',
  templateUrl: './progress-view.component.html',
  styleUrls: ['./progress-view.component.scss'],
  providers: []
})
export class ProgressViewComponent implements OnInit, OnChanges {

  @Input() story: Story;
  progress: StoryProgress;
  chart;



  columns: ITdDataTableColumn[] = [
    { name: 'day', label: 'Day #', tooltip: 'Sprint Day', numeric: false },
    { name: 'remaining', label: 'Remaining', numeric: true },
    { name: 'daily', label: 'Daily Progress', numeric: true },
    { name: 'trend', label: 'Trend' },
    { name: 'edit', label: '' },
  ];

  constructor(
    public sprintService: SprintService,
    public storyService: StoryService,
  ) {

  }

  ngOnInit() {
    this.progress = Story.getLatestProgress(this.story);
  }

  ngAfterViewInit() {
    this.createChart(this.progress);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.progress = Story.getLatestProgress(this.story);
    this.updateChart(this.progress);
  }

  public progressAsPercentage(): number {
    return Story.progressAsPercentage(this.story);
  }


  private updateChart(progress: StoryProgress) {

    if (this.chart === undefined) {
      return;
    }

    this.chart.load({
      columns: [
        ['previous', progress.previous],
        ['daily', progress.daily],
        ['remaining', progress.remaining]]
    });

    d3.select('#chart text.c3-chart-arcs-title').node().innerHTML
      = StoryProgress.progressAsPercentage(this.progress) + '%';

  }

  createChart(progress: StoryProgress) {

    this.chart = c3.generate({
      bindto: '#chart',
      size: {
        width: 350,
        height: 350
      },
      data: {
        columns: [
          ['previous', progress.previous],
          ['daily', progress.daily],
          ['remaining', progress.remaining],
        ],
        order: null,
        type: 'donut',
        legend: {
          show: false
        },
      },
      donut: {
        title: StoryProgress.progressAsPercentage(this.progress) + '%',
        label: {
          show: false
        }
      },
      legend: {
        show: false
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      color: {
        pattern: [
          '#1565c0',
          '#03a9f4',
          '#ededed',
        ]
      },
      transition: {
        duration: 200
      }
    });

  }


}
