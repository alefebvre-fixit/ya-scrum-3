import { Component, OnInit, Input } from '@angular/core';

import { Sprint } from '@ya-scrum/models';
import { Router } from '@angular/router';

@Component({
  selector: 'sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.scss']
})
export class SprintCardComponent {

  @Input() sprint: Sprint;

  constructor(private router: Router
  ) {
  }

  public navigateToDetails(id: string) {
    this.router.navigate([`/sprints/${id}`]);
  }

  public progressAsPercentage(): number {
    return Sprint.progressAsPercentage(this.sprint);
  }

}
