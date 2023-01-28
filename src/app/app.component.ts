import { AuthService } from './shared/service/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public loading: boolean = true;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params: any) => {
      console.log(this.authService.getToken(), 'app');
      if (this.authService.getToken()) {
        this.router.navigate(['/session/dashboard']);
        this.loading = false;
        return;
      }
    });
  }
}
