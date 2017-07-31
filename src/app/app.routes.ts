import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductBacklogComponent, StoryViewComponent } from './story';
import { SprintDashboardComponent, SprintViewComponent } from './sprint';
import { UserListComponent } from './user';

// Route Configuration
export const ROUTES: Routes = [

  {
    path: '',
    redirectTo: 'stories',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'sprints',
    component: SprintDashboardComponent
  },
  {
    path: 'sprints/:id',
    component: SprintViewComponent
  },
  { path: 'stories',
    component: ProductBacklogComponent
  },
  {
    path: 'stories/:id',
    component: StoryViewComponent
  },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);
