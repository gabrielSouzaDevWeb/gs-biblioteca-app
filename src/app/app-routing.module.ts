import { AuthService } from './shared/service/auth.service';
import { AppComponent } from './app.component';
import { AuthGuard } from './application/auth/guards/auth.guard';
import { DashboardComponent } from './application/pages/dashboard/dashboard.component';
import { MainComponent } from './application/layouts/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'session',
    // canActivate: [AuthService],
    // canLoad: [AuthService],
  },
  // { path: 'auth', component: AppComponent },
  {
    path: 'session',
    canActivate: [AuthGuard],
    // component: AppComponent,

    children: [
      {
        path: 'dashboard',
        // canActivate: [AuthService],
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
