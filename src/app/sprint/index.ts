import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintCardComponent} from './sprint-card.component';
import { SprintGridComponent} from './sprint-grid.component';
import { SprintDashboardComponent} from './sprint-dashboard.component';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SprintService } from './services';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  declarations: [SprintCardComponent, SprintGridComponent, SprintDashboardComponent],
  exports: [SprintCardComponent, SprintGridComponent, SprintDashboardComponent],
  providers: [SprintService]
})

export class SprintModule { }


export * from './sprint-dashboard.component';
export * from './models';
export * from './services';
