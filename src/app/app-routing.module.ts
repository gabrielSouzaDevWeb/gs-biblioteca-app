import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './application/auth/guards/auth.guard';
import { AlunoComponent } from './application/pages/aluno/aluno.component';
import { DashboardComponent } from './application/pages/dashboard/dashboard.component';
import { LivroComponent } from './application/pages/livro/livro.component';

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

      {
        path: 'aluno',
        // canActivate: [AuthService],
        component: AlunoComponent,
      },
      {
        path: 'livro',
        // canActivate: [AuthService],
        component: LivroComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
