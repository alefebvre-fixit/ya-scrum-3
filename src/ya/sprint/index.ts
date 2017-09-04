import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CovalentDataTableModule } from '@covalent/core';
import { CovalentCommonModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentPagingModule } from '@covalent/core';
import { CovalentDialogsModule } from '@covalent/core';
import { CovalentMessageModule } from '@covalent/core';

import { NguUtilityModule } from 'ngu-utility/ngu-utility.module'; // <-- import the module
import { NgxCroppieModule } from 'ngx-croppie';


import { SprintCardComponent } from './sprint-card.component';
import { SprintGridComponent, SprintGridTitleDirective } from './sprint-grid.component';
import { SprintDashboardComponent } from './sprint-dashboard.component';
import { SprintViewComponent } from './sprint-view.component';
import { SprintEditComponent } from './sprint-edit.component';
import { SprintStatusComponent } from './sprint-status.component';
import { SprintProgressScheduleComponent } from './progress-schedule.component';
import { SprintBurndownComponent } from './sprint-burndown.component';

import { SprintBackgroundDialogComponent } from './sprint-background.dialog';

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
    CovalentCommonModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentDialogsModule,
    CovalentMessageModule,
    NguUtilityModule,
    NgxCroppieModule,
    SharedModule,
    StoryModule,
    SprintStoryModule
  ],
  declarations: [
    SprintCardComponent,
    SprintGridComponent,
    SprintGridTitleDirective,
    SprintDashboardComponent,
    SprintViewComponent,
    SprintStatusComponent,
    SprintEditComponent,
    SprintProgressScheduleComponent,
    SprintBurndownComponent,
    SprintBackgroundDialogComponent
  ],
  exports: [
    SprintCardComponent,
    SprintGridComponent,
    SprintGridTitleDirective,
    SprintDashboardComponent,
    SprintViewComponent,
    SprintEditComponent,
    SprintBackgroundDialogComponent
  ],
  providers: [
  ],
  entryComponents: [
    SprintEditComponent, SprintBackgroundDialogComponent
  ],
})

export class SprintModule { }

export { SprintViewComponent } from './sprint-view.component';
export { SprintDashboardComponent} from './sprint-dashboard.component';