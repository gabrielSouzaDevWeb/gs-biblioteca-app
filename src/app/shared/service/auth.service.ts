import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

// import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthService {
  constructor() {
    // console.log(jwt_decode(this.getToken()));
    // this.route.queryParams.subscribe(async (params: any) => {
    //   console.log(params);
    //   await this.setToken(params.token);
    //   // console.log(this.getToken());
    // });
  }

  getToken(): string | null {
    // console.log(window.sessionStorage.getItem('token'));

    return window.sessionStorage.getItem('token');
  }
  setToken(token: string): void {
    console.log(token, token === 'undefined', token === undefined);

    // this.clearToken();
    if (token === 'undefined' || token === undefined) {
      return;
    }
    return window.sessionStorage.setItem('token', token);
  }
  clearToken(): void {
    window.sessionStorage.removeItem('token');
  }
}
