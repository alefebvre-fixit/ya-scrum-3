import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryCardComponent} from './story-card.component';
import { StoryGridComponent} from './story-grid.component';
import { StoryViewComponent} from './story-view.component';
import { StoryEditComponent} from './story-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';


import { ProductBacklogComponent} from './product-backlog.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoryService } from '../services/index';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, ChartsModule],
  declarations: [StoryCardComponent, StoryGridComponent, ProductBacklogComponent, StoryViewComponent, StoryEditComponent],
  exports: [StoryCardComponent, StoryGridComponent, ProductBacklogComponent, StoryViewComponent, StoryEditComponent],
  entryComponents: [
        StoryEditComponent,
    ],
  providers: [StoryService]
})

export class StoryModule { }

export * from '../models/story';
export * from '../services/story.service';