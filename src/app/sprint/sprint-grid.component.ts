import { Component, OnInit, Input} from '@angular/core';

import { Sprint } from '../models/index';

@Component({
  selector: 'sprint-grid',
  templateUrl: './sprint-grid.component.html',
  styleUrls: ['./sprint-grid.component.css']
})
export class SprintGridComponent  {

  @Input() sprints: Sprint[];

  constructor(
  ) {
  }

}
