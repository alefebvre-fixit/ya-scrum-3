import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/index';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService {

  constructor(
    private database: AngularFireDatabase
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

}
