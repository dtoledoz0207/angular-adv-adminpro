import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../guards/admin.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchesComponent } from './searches/searches.component';

// Maintenance
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';



const childRoutes: Routes = [
  {path: '', component: DashboardComponent, data: {title: 'Dashboard'}},
  {path: 'progress', component: ProgressComponent, data: {title: 'ProgressBar'}},
  {path: 'graph1', component: Graph1Component, data: {title: 'Graph 1'}},
  {path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Theme'}},
  {path: 'promises', component: PromisesComponent, data: {title: 'Promises'}},
  {path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs'}},
  {path: 'profile', component: ProfileComponent, data: {title: 'My profile'}},
  {path: 'search/:term', component: SearchesComponent, data: {title: 'Searches'}},

  //Maintenance
  {path: 'hospitals', component: HospitalsComponent, data: {title: 'Hospitals maintenance'}},
  {path: 'doctors', component: DoctorsComponent, data: {title: 'Doctors maintenance'}},
  {path: 'doctor/:id', component: DoctorComponent, data: {title: 'Doctors maintenance'}},

  //Admin routes
  {path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: {title: 'Users maintenance'}},
];

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
