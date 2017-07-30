import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryProgressScheduleComponent} from './progress-schedule.component';
import { ProgressEditComponent} from './progress-edit.component';
import { ProgressViewComponent} from './progress-view.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { CovalentDataTableModule } from '@covalent/core';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


import { SharedModule } from '../../shared';

import { StoryService } from './../services';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    CovalentDataTableModule,
    SharedModule,
  ],
  declarations: [
    StoryProgressScheduleComponent,
    ProgressEditComponent,
    ProgressViewComponent,
  ],
  exports: [
    StoryProgressScheduleComponent,
    ProgressEditComponent,
    ProgressViewComponent,
  ],
  entryComponents: [
    ProgressEditComponent,
  ],
  providers: [StoryService]
})

export class StoryProgressModule { }

export * from './progress-schedule.component';
export * from './progress-edit.component';
export * from './progress-view.component';