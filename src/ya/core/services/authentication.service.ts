import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Group, SignUp, User } from '../models';
import { UserService } from './user.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {

  private _groupName: string;

  constructor(
  ) { }

  get groupName(): string {
    return this._groupName;
  }

  set groupName(groupName: string) {
    this._groupName = groupName;
  }

  

}
