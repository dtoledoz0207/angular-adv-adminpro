import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Maintenance
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';


const routes:Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent, data: {title: 'Dashboard'}},
      {path: 'progress', component: ProgressComponent, data: {title: 'ProgressBar'}},
      {path: 'graph1', component: Graph1Component, data: {title: 'Graph 1'}},
      {path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Theme'}},
      {path: 'promises', component: PromisesComponent, data: {title: 'Promises'}},
      {path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs'}},
      {path: 'profile', component: ProfileComponent, data: {title: 'My profile'}},

      //Maintenance
      {path: 'users', component: UsersComponent, data: {title: 'Users maintenance'}},
      {path: 'hospitals', component: HospitalsComponent, data: {title: 'Hospitals maintenance'}}
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class PagesRoutingModule {}
