import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Group, SignUp, User, Account, Invite } from '../models';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class GroupService {

  public _signup: SignUp;

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

  public registerSignUp(signup: SignUp) {
    this._signup = signup;
  }

  // public createGroupAndSignUp(group: Group, signUp: SignUp): Observable<any> {

  //   return Observable.fromPromise(<Promise<any>>this.afAuth.auth.createUserWithEmailAndPassword(signUp.email, signUp.password))
  //     .map(result =>
  //       this.afAuth.auth.currentUser.updateProfile({
  //         displayName: signUp.name,
  //         photoURL: undefined,
  //       }).then(() => {

  //         group.$key = this.create(group);

  //         const user = new User();
  //         user.$key = this.afAuth.auth.currentUser.uid;
  //         user.email = this.afAuth.auth.currentUser.email;
  //         user.name = this.afAuth.auth.currentUser.displayName;

  //         const account = Account.createFromUser(user, group);

  //         this.authentication.storeAccount(account).subscribe(() => {
  //           this.userService.saveAccount(account);
  //           this.userService.save(user);
  //         });
  //       })
  //     );
  // }

  public signUp(signUp: SignUp): Observable<any> {


    if (signUp.invite && !signUp.group) {
      console.log();
      return;
    }


    return Observable.fromPromise(<Promise<any>>this.afAuth.auth.createUserWithEmailAndPassword(signUp.email, signUp.password))
      .map(result =>
        this.afAuth.auth.currentUser.updateProfile({
          displayName: signUp.name,
          photoURL: undefined,
        }).then(() => {

          if (signUp.group && !signUp.group.$key) {
            signUp.group.$key = this.create(signUp.group);
          }

          if (signUp.invite && !signUp.invite.$key) {
            this.database.object('/groups/' + signUp.invite.groupId + '/' + signUp.invite.$key).remove();
          }

          const user = new User();
          user.$key = this.afAuth.auth.currentUser.uid;
          user.email = this.afAuth.auth.currentUser.email;
          user.name = this.afAuth.auth.currentUser.displayName;

          const account = Account.createFromUser(user, signUp.group);

          this.authentication.storeAccount(account).subscribe(() => {
            this.userService.saveAccount(account);
            this.userService.save(user);
          });
        })
      );
  }


}
