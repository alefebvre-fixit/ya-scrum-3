import { Component, OnInit, Input } from '@angular/core';

import { Story } from '@ya-scrum/models';

@Component({
  selector: 'ya-story-status',
  templateUrl: './story-status.component.html',
  styleUrls: ['./story-status.component.scss'],
})
export class StoryStatusComponent implements OnInit {

  @Input() story: Story;

  constructor(
  ) {
  }

  ngOnInit() {
  }

  public progressAsPercentage(): number {
    return Story.progressAsPercentage(this.story);
  }

}
