import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Story } from '../../models';

@Component({
  selector: 'sprint-story-grid',
  templateUrl: './sprint-story-grid.component.html',
  styleUrls: ['./sprint-story-grid.component.scss']
})
export class SprintStoryGridComponent {

  @Input() stories: Story[];

  @Output()
  onAdd = new EventEmitter();

  constructor(
  ) {
  }

  trackStory(index, story: Story) {
    return story ? story.$key : undefined;
  }

  public add() {
    this.onAdd.emit();
  }

}
