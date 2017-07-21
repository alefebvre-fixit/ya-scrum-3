import { Component, OnInit, Input} from '@angular/core';

import { Story } from '../models/index';

@Component({
  selector: 'story-grid',
  templateUrl: './story-grid.component.html',
  styleUrls: ['./story-grid.component.css']
})
export class StoryGridComponent  {

  @Input() stories: Story[];

  constructor(
  ) {
  }

}
