import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { SignIn } from '@ya-scrum/models';
import { UserService } from '@ya-scrum/services';

@Component({
  selector: 'sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  signin: SignIn = new SignIn();
  isStandBy = false;

  invalidError = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  googleSignIn() {
    this.userService.googleSignIn().subscribe(() => {
      this.router.navigate([`/sprints`]);
    }, error => { this.invalidError = true; this.ready(); });
  }

  emailSignIn(signin: SignIn) {
    this.standBy();
    this.userService.emailSignIn(signin).subscribe(() => {
      this.router.navigate([`/sprints`]);
    }, error => { this.invalidError = true; this.ready(); });
  }

  signUp() {
    this.router.navigate([`/sign-up`]);
  }


  ready() {
    this.isStandBy = false;
  }

  standBy() {
    this.isStandBy = true;
  }

}
