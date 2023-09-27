import { Injectable } from '@angular/core';
import { AuthService } from './../../../shared/service/auth.service';

import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateFn {
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
