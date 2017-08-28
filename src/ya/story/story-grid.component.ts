import { Component, OnInit, Input, Directive} from '@angular/core';

import { Story } from '../models';


@Directive({
  selector: 'story-grid-title',
})
export class StoryGridTitleDirective {}

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
