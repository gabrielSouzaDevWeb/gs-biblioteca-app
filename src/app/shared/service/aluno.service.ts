import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root',
})
export class AlunoService extends AbstractService {
  constructor(http: HttpClient, notification: NzNotificationService) {
    super('aluno', http, notification);
  }

  getAlunos() {}
}
