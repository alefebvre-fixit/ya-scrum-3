import { Component, OnInit, Input} from '@angular/core';

import { Sprint } from '../models/index';

@Component({
  selector: 'sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.css']
})
export class SprintCardComponent  {

  @Input() sprint: Sprint;

  constructor(
  ) {
  }

}
