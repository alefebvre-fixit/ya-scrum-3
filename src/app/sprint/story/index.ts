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

import { SprintStoryCardComponent } from './sprint-story-card.component';
import { SprintStoryGridComponent } from './sprint-story-grid.component';
import { SprintStorySelectorComponent } from './sprint-story-selector.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoryModule } from '../../story';

import { SprintService } from '../../services';
import { SharedModule } from '../../shared';


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
  ],
  declarations: [
    SprintStoryCardComponent,
    SprintStoryGridComponent,
    SprintStorySelectorComponent
  ],
  exports: [
    SprintStoryCardComponent,
    SprintStoryGridComponent,
    SprintStorySelectorComponent
  ],
  providers: [
  ],
  entryComponents: [
    SprintStorySelectorComponent
  ],
})

export class SprintStoryModule { }
