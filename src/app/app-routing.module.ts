import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Error404Component } from './pages/error404/error404.component';
import { Graph1Component } from './pages/graph1/graph1.component';
import { ProgressComponent } from './pages/progress/progress.component';


const routes:Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'progress', component: ProgressComponent},
  {path: 'graph1', component: Graph1Component},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: Error404Component},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
