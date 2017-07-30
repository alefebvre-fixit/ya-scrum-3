import { Component } from '@angular/core';
import { Story, StoryService } from './story';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';


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




