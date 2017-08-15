import { Component, OnInit, Input, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Chart } from 'chart.js';

import { Story, StoryProgress } from '../../models';
import { StoryService } from '../../services';

@Component({
  selector: 'sprint-story-card',
  templateUrl: './sprint-story-card.component.html',
  styleUrls: ['./sprint-story-card.component.scss']
})
export class SprintStoryCardComponent implements OnInit, OnChanges {


  @Input() story: Story;
  @ViewChild('doughnutCanvas') doughnutCanvas;

  private progress: StoryProgress;
  private percentage: String = '-';

  doughnutChart: any;


  private _data: any;
  private _chartOptions: any;
  private _configs: any;



  constructor(
    private router: Router,
    private storyService: StoryService,
  ) {

    // data for the chart
    this._data = {
      columns: [
        ['previous', 120],
        ['daily', 30],
        ['remaining', 200],
      ],
      order: null,
      type: 'donut',
      legend: {
        show: false
      },
    };

    //Options provided for chart like axis, tooltip, legend, zoom etc.
    this._configs = {
      legend: {
        show: false
      },
    };

    //Specific Chart Configuration
    this._chartOptions = {
      donut: {
        title: "-",
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
    };
  }

  ngOnInit(): void {
    this.progress = Story.getLatestProgress(this.story);
    this.percentage = StoryProgress.progressAsPercentage(this.progress) + '%';
    this.initChart(this.progress);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.progress = Story.getLatestProgress(this.story);
    this.percentage = StoryProgress.progressAsPercentage(this.progress) + '%';
  }

  private initChart(progress: StoryProgress) {
    this._data = this.getData(progress);
    this._chartOptions = this.getOptions(this.percentage);
  }


  public getData(progress: StoryProgress): any {
    return {
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
    };
  }

  public getOptions(title: String): any {
    return {
      donut: {
        title: title,
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
          '#cbcbcb',
        ]
      },
      transition: {
        duration: 200
      }
    };
  }


  public add() {
    this.progress = this.storyService.incrementDailyProgress(this.story, this.progress, +1);
    this.storyService.assignDailyProgress(this.story, this.progress);
    this.storyService.save(this.story);
  }

  public remove() {
    this.progress = this.storyService.incrementDailyProgress(this.story, this.progress, -1);
    this.storyService.assignDailyProgress(this.story, this.progress);
    this.storyService.save(this.story);
  }

  public navigateToDetails(id: string) {
    this.router.navigate([`/stories/${id}`]);
  }

  public progressAsPercentage(): number {
    return Story.progressAsPercentage(this.story);
  }


}
