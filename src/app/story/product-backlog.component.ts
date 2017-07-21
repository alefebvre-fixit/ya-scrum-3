import { Component, OnInit } from '@angular/core';
import { StoryService } from '../services/index';
import { Story } from '../models/index';

@Component({
  selector: 'product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.css']
})
export class ProductBacklogComponent implements OnInit{

  public storiesPending: Story[];
  public storiesClosed: Story[];
  public storiesInProgress: Story[];

  constructor(
    public storyService: StoryService
  ) {
  }

  ngOnInit(): void {
    this.storyService.findByStatus('progress').subscribe((stories: Story[]) => {
      this.storiesInProgress = this.storyService.sortByPriority(stories);
    });

    this.storyService.findByStatus('pending').subscribe((stories: Story[]) => {
      this.storiesPending = this.storyService.sortByPriority(stories);
    });

    this.storyService.findByStatus('closed').subscribe((stories: Story[]) => {
      this.storiesClosed = this.storyService.sortByPriority(stories);
    });

  }


}
