import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(async (params: any) => {
      await this.setToken(params.token);
      console.log(this.getToken());
    });
  }

  getToken(): string | null {
    console.log(window.sessionStorage.getItem('token'));

    return window.sessionStorage.getItem('token');
  }
  setToken(token: string): void {
    // this.clearToken();
    window.sessionStorage.setItem('token', token);
  }
  clearToken(): void {
    window.sessionStorage.removeItem('token');
  }
}
