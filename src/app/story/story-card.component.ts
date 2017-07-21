import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

import { Story } from '../models/index';

@Component({
  selector: 'story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css']
})
export class StoryCardComponent {

  @Input() story: Story;

  constructor(private router: Router
  ) {
  }

  public navigateToDetails(id: string) {
    this.router.navigate([`/stories/${id}`]);
  }

  public progressAsPercentage(): number {
    return Story.progressAsPercentage(this.story);
  }

}
