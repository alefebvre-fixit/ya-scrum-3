import { Component, OnInit, Input} from '@angular/core';

import { Story } from '../../models';

@Component({
  selector: 'sprint-story-grid',
  templateUrl: './sprint-story-grid.component.html',
  styleUrls: ['./sprint-story-grid.component.scss']
})
export class SprintStoryGridComponent  {

  @Input() stories: Story[];

  constructor(
  ) {
  }

}
