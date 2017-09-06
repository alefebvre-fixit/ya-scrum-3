import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { StoryService } from '../services';
import { Story } from '../models';
import { StoryEditDialogComponent } from './story-edit.dialog';

@Component({
  selector: 'product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.scss']
})
export class ProductBacklogComponent implements OnInit {

  public storiesPending: Story[];
  public storiesClosed: Story[];
  public storiesInProgress: Story[];

  constructor(
    private router: Router,
    private storyService: StoryService,
    private dialog: MdDialog
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

  addStory(): void {
    const dialogRef = this.dialog.open(StoryEditDialogComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: {
        story: Story.create(),
      }
    });
    dialogRef.afterClosed().subscribe(key => {
      if (key) {
        this.router.navigate([`/stories/${key}`]);
      }
    });
  }

  public navigateToDetails(id: string) {
    this.router.navigate([`/stories/${id}`]);
  }

}
