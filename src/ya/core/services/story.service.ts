import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Story, StoryProgress } from '../models';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './user.service';

const STORIES = 'stories';

@Injectable()
export class StoryService {

  private storyTypes = [
    { key: 'feature', value: 'Feature' },
    { key: 'quality', value: 'Quality' },
    { key: 'performance', value: 'Performance' },
    { key: 'documentation', value: 'Documentation' },
    { key: 'design', value: 'Design' },
  ];

  private storyStatus = [
    { key: 'new', value: 'New' },
    { key: 'assigned', value: 'Assigned' },
    { key: 'started', value: 'Started' },
    { key: 'closed', value: 'Closed' },
  ];


  public static filterPositive(value: number): number {
    if (value > 0) {
      return value;
    } else {
      return 0;
    }
  }

  constructor(
    private database: AngularFireDatabase,
    private userService: UserService,
  ) { }

  public getStoryTypes(): any {
    return this.storyTypes;
  }

  public getStoryStatus(): any {
    return this.storyStatus;
  }

  public instanciate(): Story {
    const result = Story.create();

    result.productOwnerId = this.userService.currentFirebaseUser().uid;

    return result;
  }

  public index() {
    this.findAll().take(1).subscribe((stories: Story[]) => {
      for (const story of stories) {

        if (story.status === undefined) {
          story.status = 'new';
        }

        story.filter_status = Story.getFilterStatus(story.status);
        this.save(story);
      }
    });
  }


  public findAll(): Observable<Story[]> {
    return this.database.list(STORIES, {
      query: {
        orderByChild: 'priority'
      }
    });
  }

  public findBySprintId(sprintId: string): Observable<Story[]> {
    return this.database.list(STORIES, {
      query: {
        orderByChild: 'sprintId',
        equalTo: sprintId
      }
    });
  }

  public findNewStories(): Observable<Story[]> {
    return this.findByStatus('pending');
  }

  public findByStatus(status: string): Observable<Story[]> {
    return this.database.list(STORIES, {
      query: {
        orderByChild: 'filter_status',
        equalTo: status
      }
    });
  }

  public sortByPriority(stories: Story[]) {
    return stories.sort((s1, s2) => {
      if (s1.priority > s2.priority) {
        return 1;
      }

      if (s1.priority < s2.priority) {
        return -1;
      }

      return 0;
    });
  }

  public findOne(storyKey: string): Observable<Story> {
    return this.database.object('/stories/' + storyKey);
  }

  public save(story: Story): string {
    if (story.$key) {
      return this.update(story);
    } else {
      return this.create(story);
    }
  }

  public create(story: Story): string {
    story.filter_status = Story.getFilterStatus(story.status);
    return this.database.list(STORIES).push(story).key;
  }

  public update(story: Story): string {
    story.filter_status = Story.getFilterStatus(story.status);
    this.database.object('/stories/' + story.$key).update(Story.getUpdate(story));
    return story.$key;
  }


  public delete(story: Story) {
    return this.database.object('/stories/' + story.$key).remove();
  }

  public unassignStory(story: Story) {

    const sprintId = story.sprintId;
    const join = new Object();
    join[story.$key] = false;

    this.database.object(`/storyPerSprint/${story.sprintId}/${story.$key}`).remove();
    this.database.object(`/stories/${story.$key}/sprintId`).remove();
    this.database.object(`/stories/${story.$key}`).update({ status: 'new', filter_status: Story.getFilterStatus('new'), history: [] });

    return this.database.object('/sprints/' + sprintId).take(1).subscribe(sprint => {

      if (sprint.estimate !== undefined && sprint.estimate >= story.estimate) {
        sprint.estimate -= story.estimate;
      } else {
        sprint.estimate = 0;
      };

      const progress = Story.getLatestProgress(story);

      if (sprint.progress !== undefined && sprint.progress >= progress.total) {
        sprint.progress -= progress.total;
      } else {
        sprint.progress = 0;
      };

      if (sprint.remaining !== undefined && sprint.remaining >= progress.remaining) {
        sprint.remaining -= progress.remaining;
      } else {
        sprint.remaining = 0;
      };

      if (sprint.storyNumber !== undefined && sprint.storyNumber > 0) {
        sprint.storyNumber = --sprint.storyNumber;
      } else {
        sprint.storyNumber = 0;
      }

      this.database.object(`/sprints/${sprintId}`).update({
        estimate: sprint.estimate,
        progress: sprint.progress,
        remaining: sprint.remaining,
        storyNumber: sprint.storyNumber
      });
    });

  }


  public setDailyProgress(story: Story, progress: StoryProgress, daily: number): StoryProgress {

    const result: StoryProgress = Object.assign({}, progress);

    let value = daily;

    result.total = result.previous;
    result.remaining = story.estimate - result.total;

    if (daily > 0 && daily > result.remaining) {
      value = result.remaining;
    } else if (daily < 0 && -daily > result.daily) {
      value = - result.daily;
    }

    result.daily = value;
    result.total = result.previous + result.daily;
    result.remaining = StoryService.filterPositive(story.estimate - result.total);
    return result;
  }

  public incrementDailyProgress(story: Story, progress: StoryProgress, increment: number): StoryProgress {
    return this.setDailyProgress(story, progress, progress.daily + increment);
  }

  public assignDailyProgress(story: Story, progress: StoryProgress): Story {

    story.history[progress.day - 1] = progress;
    const latest = Story.getLatestProgress(story);
    if (latest.total > 0) {
      if (latest.remaining === 0) {
        story.status = 'closed';
      } else {
        story.status = 'started';
      }
    } else {
      story.status = 'assigned';
    }


    // if (story.history) {
    //   story.progress = story.history.reduce(function (sum: any, p: StoryProgress) {
    //     p.previous = sum;
    //     p.remaining = StoryService.filterPositive(story.estimate - p.previous - p.daily);
    //     return p.previous + p.daily;
    //   }, 0);
    //   if (story.progress > 0) {
    //     if (story.progress >= story.estimate) {
    //       story.status = 'closed';
    //     } else {
    //       story.status = 'started';
    //     }
    //   } else {
    //     story.status = 'assigned';
    //   }
    // }

    return story;

  }




  // public calculateProgress(story: Story) {
  //   console.log('calculateProgress=');
  //   if (story.history) {
  //     story.progress = story.history.reduce(function (sum: number, progress: StoryProgress) {
  //       progress.previous = sum;
  //       progress.remaining = StoryService.filterPositive(story.estimate - progress.previous - progress.daily);

  //       return progress.previous + progress.daily;
  //     }, 0);

  //     if (story.progress > 0) {
  //       if (story.progress >= story.estimate) {
  //         story.status = 'closed';
  //       } else {
  //         story.status = 'started';
  //       }
  //     } else {
  //       story.status = 'assigned';
  //     }
  //   }
  //   console.log(story);
  // }

  public saveProgress(story: Story) {
    this.save(story);
  }

  public assignProductOwner(storyId: string, userId: string) {
    this.database.object(`/stories/${storyId}`).update({ productOwnerId: userId });
  }

}
