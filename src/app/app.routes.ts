import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductBacklogComponent, StoryViewComponent } from './story';
import { SprintDashboardComponent } from './sprint';
import { UserListComponent } from './user';

// Route Configuration
export const ROUTES: Routes = [

  {
    path: '',
    redirectTo: 'stories',
    pathMatch: 'full'
  },
  { path: 'sprints', component: SprintDashboardComponent },
  { path: 'stories', component: ProductBacklogComponent },
  { path: 'users', component: UserListComponent },
  {
    path: 'stories/:id',
    component: StoryViewComponent
  },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);
