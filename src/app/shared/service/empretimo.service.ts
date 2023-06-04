import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs/internal/Observable';
import { AbstractService } from './abstract.service';

export interface IEmprestimo {
  [key: string]: any;
}
@Injectable({
  providedIn: 'root',
})
export class EmpretimoService extends AbstractService {
  constructor(http: HttpClient, notification: NzNotificationService) {
    super('emprestimo', http, notification);
  }

  consultarEmprestimos(idAluno: number): Observable<IEmprestimo> {
    return this.http.get(`${this.getUri()}/by-idAluno?idAluno=${idAluno}`);
  }
}
