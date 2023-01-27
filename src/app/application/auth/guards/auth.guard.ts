import { AuthService } from './../../../shared/service/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
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
    console.log(this.authService.getToken());

    if (this.authService.getToken()) {
      console.log('entrou aqui');

      return true;
    }
    console.log('passou direto');

    const linkAcesso = `http://localhost:5500/`;
    window.open(linkAcesso.toString(), '_self');
    return false;
  }
}
