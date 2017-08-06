import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { CovalentDataTableModule } from '@covalent/core';
import { CovalentCommonModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentPagingModule } from '@covalent/core';
import { CovalentDialogsModule } from '@covalent/core';




import { NguUtilityModule } from 'ngu-utility/ngu-utility.module'; // <-- import the module

import { StoryCardComponent} from './story-card.component';
import { StoryGridComponent} from './story-grid.component';
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
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    CovalentCommonModule,
    CovalentSearchModule,
    CovalentDataTableModule,
    CovalentPagingModule,
    CovalentDialogsModule,
    NguUtilityModule,
    SharedModule,
    StoryProgressModule,
  ],
  declarations: [
    StoryCardComponent,
    StoryGridComponent,
    ProductBacklogComponent,
    StoryViewComponent,
    StoryEditComponent,
    StoryStatusComponent,
    StoryListComponent,
  ],
  exports: [
    StoryCardComponent,
    StoryGridComponent,
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
