import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { SignIn } from '../../models';

@Component({
  selector: 'sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {


  signin: SignIn = new SignIn();
  isStandBy = false;

  user: Observable<firebase.User>;


  invalidError = false;

  constructor(public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = afAuth.authState;
  }

  ngOnInit(): void {
  }

  googleSignIn() {
    this.standBy();
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      () => {
        this.router.navigate([`/sprints`]);
      }
    );
  }

  emailSignIn(signin: SignIn) {
    this.standBy();
    this.afAuth.auth.signInWithEmailAndPassword(signin.email, signin.password).catch(
      (error) => {
        this.invalidError = true;
        this.ready();
      }
      ).then(
      () => {
        this.router.navigate([`/sprints`]);
      }
      );
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
