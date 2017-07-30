import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Sprint, SprintService } from '../sprint';
import { User, UserService } from '../user';

import { StoryService } from './services';
import { Story, StoryProgress } from './models';

import { StoryEditComponent } from './story-edit.component';
import { StoryCardComponent } from './story-card.component';

@Component({
  selector: 'story-status',
  templateUrl: './story-status.component.html',
  styleUrls: ['./story-status.component.scss'],
  providers: [UserService]
})
export class StoryStatusComponent implements OnInit {

  @Input() story: Story;
  public sprint: Sprint;


  constructor(
  ) {
  }

  ngOnInit() {
  }

  public progressAsPercentage(): number {
    return Story.progressAsPercentage(this.story);
  }

}
