import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { User, Account, SignIn, SignUp } from '../models';
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
    return this.database.list(this.baseUrl());
  }

  public findOne(key: string): Observable<User> {
    return this.database.object(this.baseUrl() + '/' + key);
  }

  public save(user: User) {
    if (user.$key) {
      this.update(user);
    } else {
      this.create(user);
    }
  }

  public create(user: User) {
    this.database.list(this.baseUrl()).push(user);
  }

  public update(user: User) {
    this.database.object(this.baseUrl() + '/' + user.$key).update(User.getUpdate(user));
  }

  private baseUrl(): string {
    return 'groups/' + this.authentication.account.group.groupId + '/users';
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
    return Observable.fromPromise(<Promise<any>>this.afAuth.auth.signInWithEmailAndPassword(signin.email, signin.password))
    .flatMap((fbUser: any) => this.findOneAccount(fbUser ? fbUser.uid : undefined))
    .flatMap((account: Account) => this.authentication.storeAccount(account));
    ;
  }

  public googleSignIn(): Observable<any> {
    return Observable.fromPromise(<Promise<any>>this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }



  public currentFirebaseUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }


  public findCurrentAccount(): Observable<Account> {
    return this.afAuth.authState.flatMap(fbUser => this.findOne(fbUser ? fbUser.uid : undefined));
  }

  public findOneAccount(key: string): Observable<Account> {
    return this.database.object('accounts/' + key);
  }

  public saveAccount(account: Account) {
    if (account.$key) {
      this.updateAccount(account);
    } else {
      this.createAccount(account);
    }
  }

  public createAccount(account: Account) {
    this.database.list('accounts/').push(account);
  }

  public updateAccount(acccount: Account) {
    this.database.object('accounts/' + acccount.$key).update(Account.getUpdate(acccount));
  }





}
