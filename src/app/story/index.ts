import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryCardComponent} from './story-card.component';
import { StoryGridComponent} from './story-grid.component';
import { StoryViewComponent} from './story-view.component';
import { StoryEditComponent} from './story-edit.component';

import { StoryScheduleComponent} from './story-schedule.component';
import { ProgressEditComponent} from './progress-edit.component';
import { ProgressViewComponent} from './progress-view.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { CovalentDataTableModule } from '@covalent/core';

import { ProductBacklogComponent} from './product-backlog.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


import { SharedModule } from '../shared';

import { StoryService } from '../services/index';

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
    StoryCardComponent,
    StoryGridComponent,
    ProductBacklogComponent,
    StoryViewComponent,
    StoryEditComponent,
    StoryScheduleComponent,
    ProgressEditComponent,
    ProgressViewComponent,
  ],
  exports: [
    StoryCardComponent,
    StoryGridComponent,
    ProductBacklogComponent,
    StoryViewComponent,
    StoryEditComponent
  ],
  entryComponents: [
    StoryEditComponent,
    ProgressEditComponent,
  ],
  providers: [StoryService]
})

export class StoryModule { }

export * from '../models/story';
export * from '../services/story.service';
export * from './product-backlog.component';
