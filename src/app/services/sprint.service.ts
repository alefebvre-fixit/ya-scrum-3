import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sprint, SprintProgress, Story, StoryProgress } from '../models';
import { AngularFireDatabase } from 'angularfire2/database';

const SPRINTS = '/sprints';

@Injectable()
export class SprintService {

  constructor(
    private database: AngularFireDatabase
  ) {
  }

  public index() {
    this.findAll().take(1).subscribe((sprints: Sprint[]) => {
      for (const sprint of sprints) {

        if (sprint.status === undefined) {
          sprint.status = 'new';
        }

        sprint.filter_status = Sprint.getFilterStatus(sprint.status);
        this.save(sprint);

        this.findStoryBySprint(sprint.$key).subscribe((stories: Story[]) => {
          sprint.size = stories.reduce(function (sum: number, story: Story) {
            return story.size;
          }, 0);
          this.database.object('/sprints/' + sprint.$key).update({ size: sprint.size });
        });

      }
    });
  }

  public findAll(): Observable<Sprint[]> {
    return this.database.list(SPRINTS);
  }

  public findStoryKeysPerSprint(sprintKey: string): Observable<string[]> {
    return this.database.list('storyPerSprint/' + sprintKey).map(storiesPerSprint => storiesPerSprint
      .map(storyPerSprint => storyPerSprint.$key));
  }

  public findStoryBySprint(sprintId: string): Observable<Story[]> {
    return this.findStoryKeysPerSprint(sprintId)
      .map(storiesPerSprint => storiesPerSprint.map(storyKey => this.database.object('stories/' + storyKey))).flatMap(fbos => Observable.combineLatest(fbos));
  }

  public findOneStory(storyKey: string): Observable<Story> {
    return this.database.object('/stories/' + storyKey);
  }

  public findByStatus(status: string): Observable<Sprint[]> {
    return this.database.list(SPRINTS, {
      query: {
        orderByChild: 'filter_status',
        equalTo: status
      }
    });
  }

  public assigStoriesToSprint(sprint: Sprint, stories: Story[]) {
    for (const story of stories) {
      this.assignStoryToToSprint(sprint, story);
    }
  }

  public assignStoryToToSprint(sprint: Sprint, story: Story) {


    this.database.object('/storyPerSprint/' + sprint.$key).take(1).subscribe( existingJoin => {
      if (!existingJoin[story.$key]) {

        const join = new Object();
        join[story.$key] = true;

        for (let index = 1; index <= sprint.duration; index++) {
          const progress: StoryProgress = Story.createProgress(story, index);
          Story.setProgress(story, progress);
        }

        if (sprint.size === undefined) {
          sprint.size = story.size;
        } else {
          sprint.size += story.size;
        }

        this.database.object('/storyPerSprint/' + sprint.$key).update(join);
        this.database.object('/stories/' + story.$key).update({
          sprintId: sprint.$key,
          status: 'assigned',
          filter_status: Sprint.getFilterStatus('assigned'),
          progress: 0,
          duration: sprint.duration,
          history: story.history
        });

        this.database.object('/sprints/' + sprint.$key).update({ size: sprint.size });

      } else {
        console.log('The story is already assigned!');
      }
    });


  }

  public assignScrumMaster(sprintId: string, userId: string) {
    this.database.object('/sprints/' + sprintId).update({ scrumMasterId: userId });
  }

  public findOne(sprintKey: string): Observable<Sprint> {
    return this.database.object('/sprints/' + sprintKey);
  }

  public save(sprint: Sprint): string {
    if (sprint.$key) {
      return this.update(sprint);
    } else {
      return this.create(sprint);
    }
  }

  public create(sprint: Sprint): string {
    sprint.filter_status = Sprint.getFilterStatus(sprint.status);
    return this.database.list(SPRINTS).push(sprint).key;
  }

  public update(sprint: Sprint): string {
    sprint.filter_status = Sprint.getFilterStatus(sprint.status);
    this.database.object('/sprints/' + sprint.$key).update(Sprint.getUpdate(sprint));
    return sprint.$key;
  }

  public updateSprintProgress(story: Story) {
    this.findOne(story.sprintId).take(1).subscribe(sprint => {

      for (let storyProgress of story.history) {
        // find sprintProgress for that day
        let sprintProgress: SprintProgress = Sprint.getProgress(sprint, storyProgress.day);
        if (sprintProgress === undefined) {
          sprintProgress = Sprint.createProgress(sprint, storyProgress.day);
          Sprint.setProgress(sprint, sprintProgress);
        }
        SprintProgress.setProgress(sprintProgress, storyProgress);
      }

      // calculate progress for each day
      if (sprint.history === undefined) {
        sprint.history = new Array<SprintProgress>();
      }

      for (const sprintProgress of sprint.history) {
        const stories = sprintProgress.storiesProgress;

        if (stories !== undefined) {
          SprintProgress.reset(sprintProgress);
          for (const story of stories) {
            sprintProgress.daily += story.daily;
            sprintProgress.previous += story.previous;
            sprintProgress.total += story.total;
            sprintProgress.remaining += story.remaining;
          }
        }
      }
      // finaly calculate the overall progress
      this.calculateProgress(sprint);
      this.database.object('/sprints/' + sprint.$key).update({
        status: sprint.status,
        filter_status: Sprint.getFilterStatus(sprint.status),
        progress: sprint.progress,
        duration: sprint.duration,
        history: sprint.history
      });

    });
  }

  public calculateProgress(sprint: Sprint) {
    if (sprint.history) {
      // TODO Do a sort first
      sprint.progress = sprint.history.reduce(function (sum: number, progress: SprintProgress) {
        return progress.total;
      }, 0);

      if (sprint.progress > 0) {
        if (sprint.progress >= sprint.size) {
          sprint.status = 'closed'
        } else {
          sprint.status = 'started'
        }
      } else {
        sprint.status = 'new';
      }
    }
  }


  public generateBurndowData(sprint: Sprint, stories: Story[]): any {
    const result = { labels: [], datas: [] };
    console.log('SprintService::generateBurndowData(sprint: Sprint)');
    result.labels = this.generateLabels(sprint);
    result.datas[0] = this.generateIdealCurve(sprint);
    result.datas[1] = this.generateActualCurve(sprint, stories);

    return result;
  }

  private generateActualCurve(sprint: Sprint, stories: Story[]): any {
    const result = { data: [], label: 'Actual' };

    for (let day = 1; day <= sprint.duration; day++) {
      stories.forEach(story => {
        const progress: StoryProgress = Story.getProgress(story, day);
        if (progress !== undefined) {
          result.data[day - 1] = progress.remaining;
        }
      });
    }

    return result;
  }

  private generateIdealCurve(sprint: Sprint): any {

    const result = { data: [], label: 'Ideal' };

    for (let day = 1; day <= sprint.duration; day++) {
      const remaining = sprint.size - ((sprint.size * day) / sprint.duration);
      result.data[day - 1] = remaining;
    }

    return result;
  }

  private generateLabels(sprint: Sprint): Array<string> {
    const result: Array<string> = new Array<string>();

    for (let day = 1; day <= sprint.duration; day++) {
      result.push(day.toString());
    }

    return result;
  }


}
