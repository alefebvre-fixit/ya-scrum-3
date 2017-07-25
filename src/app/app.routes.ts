import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductBacklogComponent } from './story';
import { SprintDashboardComponent } from './sprint';

import { StoryViewComponent } from './story/story-view.component';


// Route Configuration
export const ROUTES: Routes = [

  {
    path: '',
    redirectTo: 'stories',
    pathMatch: 'full'
  },
  { path: 'sprints', component: SprintDashboardComponent },
  { path: 'stories', component: ProductBacklogComponent },
  {
    path: 'stories/:id',
    component: StoryViewComponent
  },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);
