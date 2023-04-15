import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './../service/auth.service';

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
    console.log(error);
    const mensagemError: string =
      error.error instanceof ErrorEvent
        ? error.error.message
        : `Código do error: ${error.status}; Error:${JSON.stringify(
            typeof error.error.message === typeof 'string'
              ? error.error.message
              : (error.error.message as Array<string>).join('./n')
          )}`;

    return throwError(() => mensagemError);
  }
}
