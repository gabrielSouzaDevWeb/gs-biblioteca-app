import { AuthService } from './../../../shared/service/auth.service';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // constructor(private authService: AuthService) {}
  constructor(private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // this.authService.clearToken();

    this.authService.setToken(route.queryParams['token']);

    if (this.authService.getToken() && this.authService.isTokenValid()) {
      return true;
    }

    const linkAcesso = `http://localhost:5500/`;
    window.open(linkAcesso.toString(), '_self');
    return false;
  }
}
