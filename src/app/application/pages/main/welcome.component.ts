import { AuthService } from './../../../shared/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.queryParams.subscribe((params: any) => {
      this.authService.setToken(params.token);
    });
  }

  ngOnInit() {}
}
