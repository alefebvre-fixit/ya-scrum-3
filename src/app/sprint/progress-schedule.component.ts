import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';

import { StoryService, SprintService, UserService } from '../services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '../models';


@Component({
  selector: 'sprint-progress-schedule',
  templateUrl: './progress-schedule.component.html',
  styleUrls: ['./progress-schedule.component.scss'],
})
export class SprintProgressScheduleComponent implements OnInit, OnChanges {

  @Input() progressHistory: SprintProgress[];

  data: any[] = [
  ];
  columns: ITdDataTableColumn[] = [
    { name: 'day', label: 'Day #', tooltip: 'Sprint Day', numeric: false },
    { name: 'remaining', label: 'Remaining', numeric: true },
    { name: 'daily', label: 'Daily Progress', numeric: true },
    { name: 'trend', label: 'Trend' },
    { name: 'edit', label: '' },
  ];

  selectedRows: any[] = [];

  constructor(
    public dialog: MdDialog
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  private extractData(story: Story) {
    if (story) {
      this.data = story.history;
    }
  }



}
