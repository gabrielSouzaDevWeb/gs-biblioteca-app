import { Injectable } from '@angular/core';

@Injectable()
export class AbstractService {
  constructor() {}

  getToken(): string | null {
    return window.sessionStorage.getItem('token');
  }
  setToken(token: string): void {
    this.clearToken();
    window.sessionStorage.setItem('token', token);
  }
  clearToken(): void {
    window.sessionStorage.removeItem('token');
  }
}
