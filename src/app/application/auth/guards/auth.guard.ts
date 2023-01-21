import { AuthService } from './../../../shared/service/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.authService.getToken();
    console.log(!!token);

    if (token) {
      console.log('entrou');

      return true;
    }
    const linkAcesso = `http://localhost:5500`;
    window.open(linkAcesso.toString(), '_self');

    return false;

    // this.router.navigateByUrl(linkAcesso);
  }
}
