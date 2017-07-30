import { Component, OnInit, Input} from '@angular/core';

import { Sprint } from './models';

@Component({
  selector: 'sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.scss']
})
export class SprintCardComponent  {

  @Input() sprint: Sprint;

  constructor(
  ) {
  }

}
