import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AbstractService } from './abstract.service';

// import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthService extends AbstractService {
  constructor(http: HttpClient, notification: NzNotificationService) {
    super('auth', http, notification);
  }

  isTokenValid(): boolean | any {
    return moment(this.getTokenExpiration()).isAfter(new Date());
  }

  getTokenExpiration(
    formated: boolean = false,
    format?: string
  ): Date | string {
    // const decode: any = jwt_decode(this.getToken());
    return formated
      ? moment(new Date(this.getTokenDecoded().exp * 1000)).format(
          format ?? 'DD-MM-YYYY HH:mm:ss'
        )
      : new Date(this.getTokenDecoded().exp * 1000);
  }

  getTokenDecoded(): { [key: string]: any; exp: number } {
    return jwt_decode(this.getToken() ?? '');
  }

  getInfoToken(): { [key: string]: any } {
    const { iat, exp, ...keys } = this.getTokenDecoded();
    return keys;
  }

  // setToken(token: string): void {
  //   if (token === 'undefined' || token === undefined) {
  //     return;
  //   }
  //   return window.sessionStorage.setItem('token', token);
  // }
  // clearToken(): void {
  //   window.sessionStorage.removeItem('token');
  // }
}
