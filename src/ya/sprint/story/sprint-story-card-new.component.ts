import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Story, StoryProgress } from '../../models';
import { StoryService } from '../../services';

@Component({
  selector: 'sprint-story-card-new',
  templateUrl: './sprint-story-card-new.component.html',
  styleUrls: ['./sprint-story-card-new.component.scss']
})
export class SprintStoryCardNewComponent implements OnInit {

  @Output()
  onAdd = new EventEmitter();


  constructor(
    private router: Router,
    private storyService: StoryService,
  ) {
  }

  ngOnInit(): void {
  }

  public add() {
    this.onAdd.emit();
  }


}
