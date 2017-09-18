import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Group, SignUp, User } from '../models';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class GroupService {

  private _signup: SignUp;

  constructor(
    private authentication: AuthenticationService,
    private database: AngularFireDatabase,
    private userService: UserService,
    private afAuth: AngularFireAuth,
  ) { }

  public findAll(): Observable<Group[]> {
    return this.database.list('groups');
  }

  public findOne(key: string): Observable<Group> {
    return this.database.object('/groups/' + key);
  }

  public save(group: Group) {
    if (group.$key) {
      this.update(group);
    } else {
      this.create(group);
    }
  }

  public create(group: Group): string {
    return this.database.list('groups').push(group).key;
  }

  public update(group: Group): string {
    this.database.object('/groups/' + group.$key).update(Group.getUpdate(group));
    return group.$key;
  }


  public signUp(signup: SignUp) {
    this._signup = signup;
  }

  public createGroupAndSignUp(group: Group) {
    this.create(group);
    this.authentication.groupName = group.name;
    
  }

}
