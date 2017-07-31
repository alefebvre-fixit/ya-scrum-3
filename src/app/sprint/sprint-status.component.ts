import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Sprint, SprintProgress, SprintService } from '../sprint';
import { User, UserService } from '../user';

@Component({
  selector: 'sprint-status',
  templateUrl: './sprint-status.component.html',
  styleUrls: ['./sprint-status.component.scss'],
})
export class SprintStatusComponent implements OnInit {

  @Input() sprint: Sprint;

  constructor(
  ) {
  }

  ngOnInit() {
  }

  public progressAsPercentage(): number {
    return Sprint.progressAsPercentage(this.sprint);
  }

}
