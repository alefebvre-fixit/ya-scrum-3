import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SignUp } from '../../models';


import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { UserService } from '../../services';

@Component({
  selector: 'sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  signup: SignUp = new SignUp();
  isStandBy = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  signUp(signup: SignUp) {
    this.standBy();
    this.userService.signUp(signup).subscribe(() => {
      this.router.navigate([`/sprints`]);
    }, error => {
      console.log(error); this.ready();
    });
  }

  signIn() {
    this.router.navigate([`/sign-in`]);
  }

  ready() {
    this.isStandBy = false;
  }

  standBy() {
    this.isStandBy = true;
  }


}
