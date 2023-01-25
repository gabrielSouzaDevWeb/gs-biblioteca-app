import { AppComponent } from './app.component';
import { AuthGuard } from './application/auth/guards/auth.guard';
import { DashboardComponent } from './application/pages/dashboard/dashboard.component';
import { MainComponent } from './application/layouts/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
    // canActivate: [AuthGuard],
  },
  { path: 'auth', component: AppComponent },
  {
    path: 'session',
    canActivate: [AuthGuard],
    // component: WelcomeComponent,

    children: [{ path: 'dashboard', component: DashboardComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
