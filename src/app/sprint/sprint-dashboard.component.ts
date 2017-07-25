import { Component, OnInit } from '@angular/core';
import { SprintService } from '../services/index';
import { Sprint } from '../models/index';

@Component({
  selector: 'sprint-dashboard',
  templateUrl: './sprint-dashboard.component.html',
  styleUrls: ['./sprint-dashboard.component.css']
})
export class SprintDashboardComponent implements OnInit{

  public sprintsProgress: Sprint[];
  public sprintsPending: Sprint[];
  public sprintsClosed: Sprint[];

  public status = 'progress';

  constructor(
    public sprintService: SprintService
  ) { }

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


}
