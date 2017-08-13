import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { CovalentDataTableModule } from '@covalent/core';
import { CovalentCommonModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentPagingModule } from '@covalent/core';
import { CovalentDialogsModule } from '@covalent/core';
import { CovalentMessageModule } from '@covalent/core';

import { SprintCardComponent } from './sprint-card.component';
import { SprintGridComponent } from './sprint-grid.component';
import { SprintDashboardComponent } from './sprint-dashboard.component';
import { SprintViewComponent } from './sprint-view.component';
import { SprintEditComponent } from './sprint-edit.component';
import { SprintStatusComponent } from './sprint-status.component';
import { SprintProgressScheduleComponent } from './progress-schedule.component';
import { SprintBurndownComponent } from './sprint-burndown.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoryModule } from '../story';
import { SprintStoryModule } from './story';

import { SprintService } from '../services';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    CovalentCommonModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentDialogsModule,
    CovalentMessageModule,
    SharedModule,
    StoryModule,
    SprintStoryModule
  ],
  declarations: [
    SprintCardComponent,
    SprintGridComponent,
    SprintDashboardComponent,
    SprintViewComponent,
    SprintStatusComponent,
    SprintEditComponent,
    SprintProgressScheduleComponent,
    SprintBurndownComponent,
  ],
  exports: [
    SprintCardComponent,
    SprintGridComponent,
    SprintDashboardComponent,
    SprintViewComponent,
    SprintEditComponent
  ],
  providers: [
  ],
  entryComponents: [
    SprintEditComponent,
  ],
})

export class SprintModule { }

export { SprintViewComponent } from './sprint-view.component';
export { SprintDashboardComponent} from './sprint-dashboard.component';