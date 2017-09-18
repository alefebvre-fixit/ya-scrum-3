import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { User, SignIn, SignUp } from '../models';
import { AuthenticationService } from './authentication.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';



@Injectable()
export class UserService {

  constructor(
    private authentication: AuthenticationService,
    private database: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) { }

  private roles = [
    "Product Manager",
    "Developer",
    "QA",
    "Business Analyst",
  ];

  private teams = [
    "Collateral",
    "Security-Finance"
  ];

  public getUserRoles(): Array<string> {
    return this.roles;
  }

  public getTeams(): Array<string> {
    return this.teams;
  }

  public findAll(): Observable<User[]> {
    return this.database.list('users');
  }

  public findOne(key: string): Observable<User> {
    return this.database.object('/users/' + key);
  }

  public save(user: User) {
    if (user.$key) {
      this.update(user);
    } else {
      this.create(user);
    }
  }

  public create(user: User) {
    this.database.list('users').push(user);
  }

  public update(user: User) {
    this.database.object('/users/' + user.$key).update(User.getUpdate(user));
  }


  public filterUsers(searchTerm: string, users: User[]) {
    if (users) {
      if (this.isEmpty(searchTerm) || this.isBlank(searchTerm)) {
        return users;
      }
      return users.filter((user) => {
        return user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    }
  }

  private isEmpty(str) {
    return (!str || 0 === str.length);
  }

  private isBlank(str: string) {
    return (!str || /^\s*$/.test(str));
  }

  public emailSignIn(signin: SignIn): Observable<any> {
    return Observable.fromPromise(<Promise<any>>this.afAuth.auth.signInWithEmailAndPassword(signin.email, signin.password));
  }

  public googleSignIn(): Observable<any> {
    return Observable.fromPromise(<Promise<any>>this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  public signUp(signup: SignUp): Observable<any> {
    return Observable.fromPromise(<Promise<any>>this.afAuth.auth.createUserWithEmailAndPassword(signup.email, signup.password))
      .map(result =>
        this.afAuth.auth.currentUser.updateProfile({
          displayName: signup.name,
          photoURL: undefined,
        }).then(() => {
          const account = new User();
          account.$key = this.afAuth.auth.currentUser.uid;
          account.email = this.afAuth.auth.currentUser.email;
          account.name = this.afAuth.auth.currentUser.displayName;
          this.save(account);
        })
      );
  }

  public findCurrent(): Observable<User> {
    return this.afAuth.authState.flatMap(fbUser => this.findOne(fbUser ? fbUser.uid : undefined));
  }

  public currentFirebaseUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }


}
