import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'ya-root',
  templateUrl: './ya.component.html',
  styleUrls: ['./ya.component.scss']
})
export class YaComponent {

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = afAuth.authState;
  }

  signOut() {
    this.afAuth.auth.signOut().then(
      () => {
        this.router.navigate([`/sign-in`]);
      }
    );
  }

}




