import { Injectable } from '@angular/core';
import { AuthService } from './../service/auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
        // context: request.context.get(),
        setHeaders: { 'Content-Type': 'application/json' },
      });
    }
    return next.handle(request).pipe(catchError(this.handlerError));
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`Ocorreu um erro: ${error.error.message}`);
      return throwError('Ocorreu um error, tente novamente');
    }
    console.error(
      `Código do error: ${error.status}; Error:${JSON.stringify(error.error)}`
    );
    return throwError('Ocorreu um error, tente novamente');
  }
}
