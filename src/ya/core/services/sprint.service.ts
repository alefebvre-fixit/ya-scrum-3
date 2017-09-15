import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sprint, Story, StoryProgress, SprintProgress, Upload } from '../models';

import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

const SPRINTS = '/sprints';

@Injectable()
export class SprintService {

  constructor(
    private database: AngularFireDatabase,
    private firebaseApp: FirebaseApp,
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
          sprint.estimate = stories.reduce(function (sum: number, story: Story) {
            return story.estimate;
          }, 0);
          this.database.object('/sprints/' + sprint.$key).update({ estimate: sprint.estimate });
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

  public updateProgress(sprint: Sprint, stories: Story[]) {

    let sprintProgress = 0;

    stories.forEach(story => {
      sprintProgress = story.progress;
    });


    if (sprintProgress !== sprint.progress) {
      sprint.progress = sprintProgress;

      if (sprint.progress > 0) {
        if (sprint.progress >= sprint.estimate) {
          sprint.status = 'closed';
        } else {
          sprint.status = 'started';
        }
      } else {
        sprint.status = 'new';
      }

      this.database.object('/sprints/' + sprint.$key).update({ status: sprint.status, progress: sprint.progress });
    }

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


    this.database.object('/storyPerSprint/' + sprint.$key).take(1).subscribe(existingJoin => {
      if (!existingJoin[story.$key]) {

        const join = new Object();
        join[story.$key] = true;

        story.history = [];
        if (sprint.meetingNumber > 0) {
          for (let index = 1; index <= sprint.meetingNumber; index++) {
            const progress: StoryProgress = Story.createProgress(story, index);
            Story.setProgress(story, progress);
          }
        }

        if (sprint.estimate === undefined) {
          sprint.estimate = story.estimate;
        } else {
          sprint.estimate += story.estimate;
        }

        sprint.storyNumber = sprint.storyNumber + 1;
        

        // if (existingJoin) {
        //   sprint.storyNumber = sprint.storyNumber +
        // } else {
        //   sprint.storyNumber = 1;
        // }

        this.database.object('/storyPerSprint/' + sprint.$key).update(join);
        this.database.object('/stories/' + story.$key).update({
          sprintId: sprint.$key,
          status: 'assigned',
          filter_status: Sprint.getFilterStatus('assigned'),
          progress: 0,
          duration: sprint.duration,
          history: story.history,
          storyNumber: sprint.storyNumber
        });

        this.database.object('/sprints/' + sprint.$key).update({ estimate: sprint.estimate });

      } else {
        console.log('The story is already assigned!');
      }
    });
  }

  public startNewDailyMeeting(sprint: Sprint, stories: Story[]) {

    if (!sprint.meetingNumber) {
      sprint.meetingNumber = 1;
    } else {
      sprint.meetingNumber++;
    }

    if (stories) {
      for (const story of stories) {

        let progress = Story.getProgress(story, sprint.meetingNumber);
        if (!progress) {
          progress = Story.createProgress(story, sprint.meetingNumber);
          Story.setProgress(story, progress);
          this.database.object('/stories/' + story.$key).update({
            history: story.history
          });
        }

      }

      this.database.object('/sprints/' + sprint.$key).update({ meetingNumber: sprint.meetingNumber });
    }
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

  public getSprintProgressHistory(sprint: Sprint, stories: Story[]): SprintProgress[] {

    const result: SprintProgress[] = [];

    if (stories !== undefined && stories.length > 0) {
      for (let day = 1; day <= sprint.meetingNumber; day++) {

        const sprintProgress = new SprintProgress();
        sprintProgress.day = day;
        result.push(sprintProgress);

        stories.forEach(story => {
          const storyProgress = Story.getProgress(story, day);
          if (storyProgress !== undefined) {
            SprintProgress.setProgress(sprintProgress, storyProgress);
          }
        });
      }
    }
    return result;
  }





  public generateBurndowData(sprint: Sprint, stories: Story[]): any {
    const result = { labels: [], datas: [] };

    result.labels = this.generateLabels(sprint);
    result.datas[0] = this.generateIdealCurve(sprint);
    result.datas[1] = this.generateActualCurve(sprint, stories);

    return result;
  }

  public generateActualCurve(sprint: Sprint, stories: Story[]): Array<any> {
    const result = [];

    result[0] = sprint.estimate;

    for (let day = 1; day <= sprint.duration; day++) {
      stories.forEach(story => {
        const progress: StoryProgress = Story.getProgress(story, day);
        if (progress !== undefined) {
          if (result[day]) {
            result[day] += progress.remaining;
          } else {
            result[day] = progress.remaining;
          }
        }
      });
    }

    return result;
  }

  public generateIdealCurve(sprint: Sprint): Array<any> {

    const result = [];
    result[0] = sprint.estimate;

    for (let day = 1; day <= sprint.duration; day++) {
      const remaining = sprint.estimate - ((sprint.estimate * day) / sprint.duration);
      result[day] = remaining;
    }

    return result;
  }

  public generateLabels(sprint: Sprint): Array<string> {
    const result: Array<string> = new Array<string>();
    result.push('0');

    for (let day = 1; day <= sprint.duration; day++) {
      result.push(day.toString());
    }

    return result;
  }

  uploadSprintBackgroundAsBase64(sprint: Sprint, image: string) {


    const imageBase64 = image.replace('data:image/png;base64,', '');

    // Create a storage reference from our storage service
    const storageRef = this.firebaseApp.storage().ref();

    const uploadTask = storageRef.child(`sprints/${sprint.$key}/background.jpg`).putString(imageBase64, 'base64', { contentType: 'image/jpeg' });
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) => {
        // upload in progress
        //upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('upload success');
      }
    );
  }

}
