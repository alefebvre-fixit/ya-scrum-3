import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { CovalentDataTableModule } from '@covalent/core';
import { CovalentCommonModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentPagingModule } from '@covalent/core';
import { CovalentDialogsModule } from '@covalent/core';
import { CovalentMessageModule } from '@covalent/core';

import { NguUtilityModule } from 'ngu-utility/ngu-utility.module'; // <-- import the module

import { StoryCardComponent} from './story-card.component';
import { StoryGridComponent, StoryGridTitleDirective} from './story-grid.component';
import { StoryListComponent} from './story-list.component';
import { StoryViewComponent} from './story-view.component';
import { StoryEditComponent} from './story-edit.component';
import { StoryStatusComponent} from './story-status.component';
import { ProductBacklogComponent} from './product-backlog.component';

import { SharedModule } from '../shared';
import { StoryProgressModule } from './progress';

import { StoryService } from '../services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CovalentCommonModule,
    CovalentSearchModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentDialogsModule,
    CovalentMessageModule,
    NguUtilityModule,
    SharedModule,
    StoryProgressModule,
  ],
  declarations: [
    StoryCardComponent,
    StoryGridComponent,
    StoryGridTitleDirective,
    ProductBacklogComponent,
    StoryViewComponent,
    StoryEditComponent,
    StoryStatusComponent,
    StoryListComponent,
  ],
  exports: [
    StoryCardComponent,
    StoryGridComponent,
    StoryGridTitleDirective,
    ProductBacklogComponent,
    StoryViewComponent,
    StoryEditComponent,
    StoryListComponent,
  ],
  entryComponents: [
    StoryEditComponent,
  ],
  providers: []
})

export class StoryModule { }

export { ProductBacklogComponent } from './product-backlog.component';
export { StoryViewComponent } from './story-view.component';
