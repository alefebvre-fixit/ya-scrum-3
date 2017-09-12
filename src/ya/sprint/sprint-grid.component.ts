import { Component, OnInit, Input, Directive} from '@angular/core';

import { Sprint } from '@ya-scrum/models';


@Directive({
  selector: 'sprint-grid-title',
})
export class SprintGridTitleDirective {}

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
