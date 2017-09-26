import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sprint, Story, StoryProgress, SprintProgress, Upload, User } from '../models';
import { UserService } from './user.service';
import { DateService } from './date.service';
import { AuthenticationService } from './authentication.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';


@Injectable()
export class SprintService {

  constructor(
    private database: AngularFireDatabase,
    private firebaseApp: FirebaseApp,
    private userService: UserService,
    private dateService: DateService,
    private authentication: AuthenticationService,
  ) {
  }

  private baseUrl(ressource: string): string {
    return this.authentication.baseUrl(ressource);
  }

  private sprintsUrl() {
    return this.authentication.baseUrl('sprints/');
  }

  private storiesUrl() {
    return this.authentication.baseUrl('stories/');
  }

  private storiesPerSprintUrl() {
    return this.authentication.baseUrl('storyPerSprint/');
  }


  public instanciate(): Sprint {
    const result = Sprint.create();

    const now = new Date();
    result.scrumMasterId = this.userService.currentFirebaseUser().uid;
    result.startDate = now.toISOString();
    result.endDate = this.dateService.businessDaysFromDate(now, result.duration).toISOString();

    return result;
  }


  public index() {
    this.findAll().take(1).subscribe((sprints: Sprint[]) => {
      for (const sprint of sprints) {

        if (sprint.status === undefined) {
          sprint.status = Sprint.STATUS_NEW;
        }

        sprint.filter_status = Sprint.getFilterStatus(sprint.status);
        this.save(sprint);

        this.findStoryBySprint(sprint.$key).subscribe((stories: Story[]) => {
          sprint.estimate = stories.reduce(function (sum: number, story: Story) {
            return story.estimate;
          }, 0);
          this.database.object(this.sprintsUrl() + sprint.$key).update({ estimate: sprint.estimate });
        });

      }
    });
  }

  public findAll(): Observable<Sprint[]> {
    return this.database.list(this.sprintsUrl());
  }

  public findStoryKeysPerSprint(sprintKey: string): Observable<string[]> {
    return this.database.list(this.storiesPerSprintUrl() + sprintKey).map(storiesPerSprint => storiesPerSprint
      .map(storyPerSprint => storyPerSprint.$key));
  }

  public findStoryBySprint(sprintId: string): Observable<Story[]> {
    return this.findStoryKeysPerSprint(sprintId)
      .map(storiesPerSprint => storiesPerSprint.map(storyKey => this.database.object(this.storiesUrl() + storyKey))).flatMap(fbos => Observable.combineLatest(fbos));
  }

  public updateProgress(sprint: Sprint, stories: Story[]) {

    let sprintProgress = 0;

    stories.forEach(story => {
      const latest = Story.getLatestProgress(story);
      sprintProgress += latest.total;
    });

    if (sprintProgress !== sprint.progress) {
      sprint.progress = sprintProgress;

      if (sprint.progress > 0) {
        if (sprint.progress >= sprint.estimate) {
          sprint.status = Sprint.STATUS_CLOSED;
        } else {
          sprint.status = Sprint.STATUS_STARTED;
        }
      } else {
        sprint.status = Sprint.STATUS_NEW;
      }

      //TODO Update filter
      this.database.object(this.sprintsUrl() + sprint.$key).update({ status: sprint.status, progress: sprint.progress });
    }

  }

  public findOneStory(storyKey: string): Observable<Story> {
    return this.database.object(this.storiesUrl() + storyKey);
  }

  public findByStatus(status: string): Observable<Sprint[]> {
    return this.database.list(this.sprintsUrl(), {
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


    this.database.object(this.storiesPerSprintUrl() + sprint.$key).take(1).subscribe(existingJoin => {
      if (!existingJoin[story.$key]) {

        const join = new Object();
        join[story.$key] = true;

        story.history = [];
        if (sprint.meeting.day > 0) {
          for (let index = 1; index <= sprint.meeting.day; index++) {
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

        this.database.object(this.storiesPerSprintUrl() + sprint.$key).update(join);
        this.database.object(this.storiesUrl() + story.$key).update({
          sprintId: sprint.$key,
          status: Story.STATUS_ASSIGNED,
          filter_status: Story.getFilterStatus(Story.STATUS_ASSIGNED),
          progress: 0,
          duration: sprint.duration,
          history: story.history,
        });

        this.database.object(this.sprintsUrl() + sprint.$key).update({ estimate: sprint.estimate, storyNumber: sprint.storyNumber });

      } else {
        console.log('The story is already assigned!');
      }
    });
  }

  public cancelLastDailyMeeting(sprint: Sprint, stories: Story[]) {
    if (stories) {

      for (const story of stories) {
        Story.cancelLatestProgress(story);
        this.database.object(this.storiesUrl() + story.$key).update({
          history: story.history
        });
      }

      if (sprint.meeting.day > 0) {
        sprint.meeting.day--;
      } else {
        sprint.meeting.day = 0;
      }
      sprint.meeting.status = Sprint.STATUS_CLOSED;

      Sprint.updateProgress(sprint, stories);
      this.database.object(this.sprintsUrl() + sprint.$key).update({
        meeting: sprint.meeting,
        progress: sprint.progress,
        remaining: sprint.remaining,
        estimate: sprint.estimate
      });
    }
  }

  public closedDailyMeeting(sprint: Sprint, stories: Story[]) {
    sprint.status = Sprint.STATUS_STARTED;
    sprint.meeting.status = Sprint.STATUS_CLOSED;

    if (sprint.meeting.day === sprint.duration) {
      sprint.status = Sprint.STATUS_CLOSED;
    }
    sprint.filter_status = Sprint.getFilterStatus(sprint.status);

    this.database.object(this.sprintsUrl() + sprint.$key).update({
      meeting: sprint.meeting,
      status: sprint.status,
      filter_status: sprint.filter_status
    });
  }


  public startNewDailyMeeting(sprint: Sprint, stories: Story[]) {

    if (!sprint.meeting.day) {
      sprint.meeting.day = 1;
    } else {
      sprint.meeting.day++;
    }
    sprint.status = Sprint.STATUS_STARTED;
    sprint.meeting.status = Sprint.STATUS_OPEN;
    sprint.filter_status = Sprint.getFilterStatus(sprint.status);

    if (stories) {
      for (const story of stories) {

        let progress = Story.getProgress(story, sprint.meeting.day);
        if (!progress) {
          progress = Story.createProgress(story, sprint.meeting.day);
          Story.setProgress(story, progress);
          this.database.object(this.storiesUrl() + story.$key).update({
            history: story.history
          });
        }

      }

      this.database.object(this.sprintsUrl() + sprint.$key).update({
        meeting: sprint.meeting,
        status: sprint.status,
        filter_status: sprint.filter_status
      });
    }
  }



  public assignScrumMaster(sprintId: string, userId: string) {
    this.database.object(this.sprintsUrl() + sprintId).update({ scrumMasterId: userId });
  }

  public findOne(sprintKey: string): Observable<Sprint> {
    return this.database.object(this.sprintsUrl() + sprintKey);
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
    return this.database.list(this.sprintsUrl()).push(sprint).key;
  }

  public update(sprint: Sprint): string {
    sprint.filter_status = Sprint.getFilterStatus(sprint.status);
    this.database.object(this.sprintsUrl() + sprint.$key).update(Sprint.getUpdate(sprint));
    return sprint.$key;
  }

  public getSprintProgressHistory(sprint: Sprint, stories: Story[]): SprintProgress[] {

    const result: SprintProgress[] = [];

    if (stories !== undefined && stories.length > 0) {
      for (let day = 1; day <= sprint.meeting.day; day++) {

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

    const uploadTask = storageRef.child(this.sprintsUrl() + `${sprint.$key}/background.jpg`).putString(imageBase64, 'base64', { contentType: 'image/jpeg' });
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
