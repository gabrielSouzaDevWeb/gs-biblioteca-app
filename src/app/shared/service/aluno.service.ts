import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlunoService extends AbstractService {
  constructor(public override http: HttpClient) {
    super('aluno', http);
  }

  getAlunos() {}
}
