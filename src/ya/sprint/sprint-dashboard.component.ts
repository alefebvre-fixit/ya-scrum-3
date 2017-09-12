import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { SprintService } from '@ya-scrum/services';
import { Sprint } from '@ya-scrum/models';

import { SprintEditDialogComponent } from './sprint-edit.dialog';

@Component({
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
    const dialogRef = this.dialog.open(SprintEditDialogComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: {
        sprint: Sprint.create(),
      }
    });
    dialogRef.afterClosed().subscribe(key => {
      if (key) {
        this.router.navigate([`/sprints/${key}`]);
      }
    });
  }

}
