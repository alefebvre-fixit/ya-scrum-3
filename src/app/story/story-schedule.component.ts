import { Component, OnInit, Input, OnChanges } from '@angular/core';


import { Story, StoryProgress } from '../models/index';

import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';



@Component({
  selector: 'story-schedule',
  templateUrl: './story-schedule.component.html',
  styleUrls: ['./story-schedule.component.scss'],
})
export class StoryScheduleComponent implements OnInit, OnChanges {

  @Input() story: Story;

  constructor(
    private _dataTableService: TdDataTableService,
  ) {
  }

  ngOnInit(): void {
    this.extractData(this.story);
  }

  ngOnChanges(): void {
    this.extractData(this.story);
  }

  private extractData(story: Story){
    if (story) {
      this.data = story.history;
    }
  }

  data: any[] = [
  ];
  columns: ITdDataTableColumn[] = [
    { name: 'day', label: 'Day #', tooltip: 'Sprint Day' , numeric: false},
    { name: 'remaining', label: 'Remaining' , numeric: true},
    { name: 'daily', label: 'Daily Progress', numeric: true},
    { name: 'trend', label: ''},

  ];


  selectedRows: any[] = [];


}
