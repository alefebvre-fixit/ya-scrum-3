import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';
import { StoryCardComponent } from './story-card.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    StoryCardComponent,
  ],
  exports: [
    StoryCardComponent,
  ],
  entryComponents: [
  ],
  providers: [
  ]
})

export class StoryCardModule { }
