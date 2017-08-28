import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';

import { StoryService, SprintService, UserService } from '../../services';
import { Story, StoryProgress, Sprint, SprintProgress, User } from '../../models';


import { ProgressEditComponent } from './progress-edit.component';


@Component({
  selector: 'story-progress-schedule',
  templateUrl: './progress-schedule.component.html',
  styleUrls: ['./progress-schedule.component.scss'],
})
export class StoryProgressScheduleComponent implements OnInit, OnChanges {

  @Input() story: Story;

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
    public dialog: MdDialog
  ) {
  }

  ngOnInit(): void {
    this.extractData(this.story);
  }

  ngOnChanges(): void {
    this.extractData(this.story);
  }

  private extractData(story: Story) {
    if (story) {
      this.data = story.history;
    }
  }

  private edit(progress: StoryProgress) {
    console.log(progress);

    const dialogRef = this.dialog.open(ProgressEditComponent, { width: '800px' });
    dialogRef.componentInstance.story = this.story;
    dialogRef.componentInstance.progress = progress;

    dialogRef.afterClosed().subscribe(result => {
    });

  }



}
