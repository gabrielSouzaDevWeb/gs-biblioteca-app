import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}

  getToken(): string | null {
    return window.sessionStorage.getItem('token');
  }
  setToken(token: string): void {
    window.sessionStorage.setItem('token', token);
  }
}
