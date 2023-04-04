import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GsTableComponent } from './application/components/gs-table/gs-table.component';
import { DashboardComponent } from './application/pages/dashboard/dashboard.component';

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
    // canActivate: [AuthGuard],
    // component: AppComponent,

    children: [
      {
        path: 'dashboard',
        // canActivate: [AuthService],
        component: DashboardComponent,
      },
      {
        path: 'aluno',
        // canActivate: [AuthService],
        // component: DashboardComponent,
        children: [
          {
            path: 'consultar',
            // canActivate: [AuthService],
            component: GsTableComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
