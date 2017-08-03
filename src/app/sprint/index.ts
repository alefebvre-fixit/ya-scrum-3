import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SprintCardComponent} from './sprint-card.component';
import { SprintGridComponent} from './sprint-grid.component';
import { SprintDashboardComponent} from './sprint-dashboard.component';
import { SprintViewComponent} from './sprint-view.component';
import { SprintEditComponent} from './sprint-edit.component';
import { SprintStatusComponent} from './sprint-status.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoryModule } from '../story';

import { SprintService } from '../services';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    StoryModule
  ],
  declarations: [
    SprintCardComponent,
    SprintGridComponent,
    SprintDashboardComponent,
    SprintViewComponent,
    SprintStatusComponent,
    SprintEditComponent
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