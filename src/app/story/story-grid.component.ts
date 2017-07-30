import { Component, OnInit, Input} from '@angular/core';

import { Story } from './models';

@Component({
  selector: 'story-grid',
  templateUrl: './story-grid.component.html',
  styleUrls: ['./story-grid.component.scss']
})
export class StoryGridComponent  {

  @Input() stories: Story[];

  constructor(
  ) {
  }

}
