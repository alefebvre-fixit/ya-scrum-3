import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { SprintService } from '../services';
import { Sprint } from '../models';

import { SprintEditComponent } from './sprint-edit.component';

@Component({
  selector: 'sprint-dashboard',
  templateUrl: './sprint-dashboard.component.html',
  styleUrls: ['./sprint-dashboard.component.scss']
})
export class SprintDashboardComponent implements OnInit {

  public sprintsProgress: Sprint[];
  public sprintsPending: Sprint[];
  public sprintsClosed: Sprint[];

  public status = 'progress';

  constructor(
    private router: Router,
    public sprintService: SprintService,
    private dialog: MdDialog
  ) {
  }


  ngOnInit(): void {
    this.sprintService.findByStatus('pending').subscribe((sprints: Sprint[]) => {
      this.sprintsPending = sprints;
    });

    this.sprintService.findByStatus('progress').subscribe((sprints: Sprint[]) => {
      this.sprintsProgress = sprints;
    });

    this.sprintService.findByStatus('closed').subscribe((sprints: Sprint[]) => {
      this.sprintsClosed = sprints;
    });

  }


  addSprint(): void {
    const dialogRef = this.dialog.open(SprintEditComponent, { width: '800px' });
    dialogRef.componentInstance.sprint = Sprint.create();
    dialogRef.afterClosed().subscribe(key => {
      if (key) {
        this.router.navigate([`/sprints/${key}`]);
      }
    });
  }

}
