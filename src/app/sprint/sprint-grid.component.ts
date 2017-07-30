import { Component, OnInit, Input} from '@angular/core';

import { Sprint } from './models';

@Component({
  selector: 'sprint-grid',
  templateUrl: './sprint-grid.component.html',
  styleUrls: ['./sprint-grid.component.scss']
})
export class SprintGridComponent  {

  @Input() sprints: Sprint[];

  constructor(
  ) {
  }

}
