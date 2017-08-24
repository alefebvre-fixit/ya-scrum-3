import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SignUp } from '../../models';


import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  signup: SignUp = new SignUp();
  isStandBy = false;

  constructor(public afAuth: AngularFireAuth,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  signUp(signup: SignUp) {
    this.standBy();
    firebase.auth().createUserWithEmailAndPassword(signup.email, signup.password).catch((error: any) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
      this.ready();
    }).then((success: any) => {

      const user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: signup.name,
        photoURL: undefined,
      }).then(() => {
        this.router.navigate([`/sprints`]);
      });


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
