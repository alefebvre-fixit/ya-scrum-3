import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Group } from '@ya-scrum/models';
import { UserService } from '@ya-scrum/services';
import { GroupService } from '@ya-scrum/services';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  templateUrl: './create-group-page.component.html',
  styleUrls: ['./create-group-page.component.scss']
})
export class CreateGroupPageComponent implements OnInit {

  isStandBy = false;
  groupForm: FormGroup;
  invalidError = false;

  user: any;

  constructor(
    private groupService: GroupService,

    private _fb: FormBuilder,
    private router: Router
  ) {
    this.user = groupService._signup;
  }

  ngOnInit(): void {
    this.groupForm = this._fb.group({
      name: ['', [<any>Validators.required]],
    });
  }

  onSubmit() {
    this.standBy();


    const group: Group = new Group();

    group.name = this.groupForm.value.name;
    this.groupService.createGroupAndSignUp(group, this.user).subscribe(() => {
      this.router.navigate([`/sprints`]);
    }, error => {
      console.log(error);
      this.ready();
    });

    // this.userService.signUp(signup).subscribe(() => {
    //   this.router.navigate([`/sprints`]);
    // }, error => {
    //   console.log(error); this.ready();
    // });


  }

  ready() {
    this.isStandBy = false;
  }

  standBy() {
    this.isStandBy = true;
  }


}
