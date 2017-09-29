import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sprint, Story, StoryProgress, SprintProgress, Upload, User, Invite } from '../models';
import { UserService } from './user.service';
import { DateService } from './date.service';
import { AuthenticationService } from './authentication.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';


@Injectable()
export class InviteService {

  constructor(
    private database: AngularFireDatabase,
    private firebaseApp: FirebaseApp,
    private userService: UserService,
    private authentication: AuthenticationService,
  ) {
  }

  private baseUrl(ressource: string): string {
    return this.authentication.baseUrl(ressource);
  }

  private inviteUrl() {
    return this.authentication.baseUrl('invites/');
  }

  public save(invite: Invite) {
    if (invite.$key) {
      this.update(invite);
    } else {
      this.create(invite);
    }
  }

  private create(invite: Invite): string {
    return this.database.list(this.inviteUrl()).push(invite).key;
  }

  private update(invite: Invite): string {
    this.database.object(this.inviteUrl() + invite.$key).update(Invite.getUpdate(invite));
    return invite.$key;
  }

  public findAll(): Observable<Invite[]> {
    return this.database.list(this.inviteUrl());
  }

  public findOne(key: string): Observable<Invite> {
    return this.database.object(this.inviteUrl() + key);
  }

  public buildUrl(invite: Invite) {
    return 'http://localhost:4200/invite/' + invite.$key;
  }

  public instanciate(): Invite {
    const result = Invite.create();

    const now = new Date();
    result.date = now.toISOString();
    result.groupId = this.authentication.account.group.groupId;

    return result;
  }













}
