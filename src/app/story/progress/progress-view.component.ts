import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';

import { StoryService, SprintService, UserService } from '../../services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '../../models';


@Component({
  selector: 'story-progress-view',
  templateUrl: './progress-view.component.html',
  styleUrls: ['./progress-view.component.scss'],
  providers: []
})
export class ProgressViewComponent implements OnInit, OnChanges {

  @Input() story: Story;
  private progress: StoryProgress;

  // Doughnut
  public doughnutChartLabels: string[] = ['previous', 'daily', 'remaining'];
  public doughnutChartData: number[] = [0, 0, 1];
  public doughnutChartType = 'doughnut';
  public colors: any = [{ backgroundColor: ['#15B7B9', '#10DDC2', '#F5F5F5'] }];
  public options = {
    tooltips: {
      enabled: false
    }
  };

  data: any[] = [
  ];
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
    this.displayLatestProgress();
  }

  ngOnChanges() {
    this.displayLatestProgress();
  }

  public progressAsPercentage(): number {
    return Story.progressAsPercentage(this.story);
  }


  public displayLatestProgress() {
    this.progress = Story.getLatestProgress(this.story);

    this.updateChart(this.progress);
  }

  public updateChart(progress: StoryProgress) {
    if (progress){
      this.doughnutChartData = [progress.previous, progress.daily, progress.remaining];
    }
  }


}
