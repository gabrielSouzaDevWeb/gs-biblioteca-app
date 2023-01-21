import { AuthGuard } from './application/auth/guards/auth.guard';
import { WelcomeComponent } from './application/pages/main/welcome.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'session',

    // canActivate: [AuthGuard],
  },
  // { path: 'session', component: WelcomeComponent },
  {
    path: 'session',
    canActivate: [AuthGuard],
    children: [
      // { path: '', redirectTo: 'session/welcome', pathMatch: 'full' },
      {
        // canActivate: [UsuarioAutenticadoGuard],
        path: 'welcome',
        component: WelcomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
