import { Component, OnInit, Input, OnChanges, ViewChild, SimpleChanges, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Story, StoryProgress } from '@ya-scrum/models';
import { StoryService } from '@ya-scrum/services';
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
  selector: 'sprint-story-card',
  templateUrl: './sprint-story-card.component.html',
  styleUrls: ['./sprint-story-card.component.scss']
})
export class SprintStoryCardComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() story: Story;

  progress: StoryProgress;
  private chart;

  constructor(
    private router: Router,
    private storyService: StoryService,
  ) {
  }

  ngOnInit(): void {
    this.progress = Story.getLatestProgress(this.story);
  }

  ngAfterViewInit() {
    this.createChart(this.progress);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.progress = Story.getLatestProgress(this.story);
    this.updateChart(this.progress);
  }
  
  public add() {
    this.updateProgress(+1);
  }

  public remove() {
    this.updateProgress(-1);
  }

  private updateProgress(increment: number) {
    this.progress = this.storyService.incrementDailyProgress(this.story, this.progress, increment);
    this.storyService.assignDailyProgress(this.story, this.progress);
    this.storyService.save(this.story);
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

    d3.select('#' + this.story.$key + ' text.c3-chart-arcs-title').node().innerHTML
          = StoryProgress.progressAsPercentage(this.progress) + '%';

  }

  public navigateToDetails(id: string) {
    this.router.navigate([`/stories/${id}`]);
  }

  public progressAsPercentage(): number {
    return Story.progressAsPercentage(this.story);
  }

  createChart(progress: StoryProgress) {

    this.chart = c3.generate({
      bindto: '#' + this.story.$key,
      size: {
        width: 250,
        height: 250
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
