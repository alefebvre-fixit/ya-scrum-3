import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintCardComponent} from './sprint-card.component';
import { SprintGridComponent} from './sprint-grid.component';
import { SprintDashboardComponent} from './sprint-dashboard.component';
import { SprintViewComponent} from './sprint-view.component';
import { SprintStatusComponent} from './sprint-status.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

//import { StoryModule } from '../story';

import { SprintService } from '../services';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    //StoryModule
  ],
  declarations: [
    SprintCardComponent,
    SprintGridComponent,
    SprintDashboardComponent,
    SprintViewComponent,
    SprintStatusComponent
  ],
  exports: [
    SprintCardComponent,
    SprintGridComponent,
    SprintDashboardComponent,
    SprintViewComponent
  ],
  providers: [
  ]
})

export class SprintModule { }

export { SprintViewComponent } from './sprint-view.component';
export { SprintDashboardComponent} from './sprint-dashboard.component';