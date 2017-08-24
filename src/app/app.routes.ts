import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductBacklogComponent, StoryViewComponent } from './story';
import { SprintDashboardComponent, SprintViewComponent } from './sprint';

import { UserListComponent } from './user';
import { UserAccountComponent } from './user';

import { SignInPageComponent, SignUpPageComponent } from './user';
import { AuthGuard } from './auth.service';

// Route Configuration
export const ROUTES: Routes = [

  {
    path: '',
    redirectTo: 'stories',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInPageComponent
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent
  },
  {
    path: 'account',
    component: UserAccountComponent
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sprints',
    component: SprintDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sprints/:id',
    component: SprintViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stories',
    component: ProductBacklogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stories/:id',
    component: StoryViewComponent,
    canActivate: [AuthGuard]
  },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);
