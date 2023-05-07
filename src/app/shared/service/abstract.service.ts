import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs/internal/Observable';
import { IQueryParams } from 'src/app/application/lib/interface/table.interface';
import { IAluno } from 'src/app/shared/interface/aluno.interface';

interface abstractType {
  idPrivado: number;
  idPublico?: string;
}
@Injectable()
export class AbstractService {
  @Injectable() public entity: string;
  constructor(
    @Inject('entity') entity: string,
    public http: HttpClient,
    public notification: NzNotificationService
  ) {
    this.entity = entity;
  }

  //TODO: Criar urlService
  //TODO: Criar abstractCrudService
  getUri(entity: string = this.entity): string {
    const uris: { [key: string]: string } = {
      [`aluno`]: this.getUriByEnviroment({
        port: 3000,
        entity: 'aluno',
        api: 'biblioteca',
      }),
      [`livro`]: this.getUriByEnviroment({
        port: 3000,
        entity: 'livro',
        api: 'biblioteca',
      }),
    };

    return uris[entity];
  }

  getUriByEnviroment(uri: {
    port: number;
    entity: string;
    api: string;
  }): string {
    const { port, entity = this.entity, api } = uri;

    return `http://localhost:${port}/${entity}`;
  }

  getHeader(authToken: string | null = this.getToken()): {
    headers: HttpHeaders;
  } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }
  getDetalhe<T = any>(idPrivado: number): Observable<T> {
    return this.http.get<T>(`${this.getUrl(`detalhe`)}?idPrivado=${idPrivado}`);
  }

  getAll<T>(params: IQueryParams): Observable<T> {
    // TODO: implement a consulte return type based in the get endpoint type
    const {
      entity = this.entity,
      title,
      filters,
      take = 10,
      page = 1,
      all = filters && filters?.length === 0,
    } = params;
    console.log(filters);

    let filterParams: Array<string> = [];
    let query: string;

    if (filters && filters?.length !== 0 && !all) {
      for (const filter of filters) {
        filterParams.push(`${filter.columnName}=${filter.value}`);
      }
      query = `?${filterParams.join('&')}&take=${take}&page=${page}`;
    } else {
      query = `?all=true&take=${take}&page=${page}`;
    }

    return this.http.get<T>(this.getUrl(query), this.getHeader());
  }

  salvarRegistro(form: IAluno): Observable<IAluno> {
    console.log(form, this.getUrl());
    //TODO: melhorar os observables
    //TODO: notificações, adicionar as de error e remover duplicidade

    return this.http.post<IAluno>(this.getUrl(), form, this.getHeader());
  }

  editarRegistro(form: IAluno): Observable<IAluno> {
    return this.http.put<IAluno>(
      this.getUrl(`atualizar/${form.idPrivado}`),
      form,
      this.getHeader()
    );
  }

  deletar<T extends abstractType>(form: T): Observable<T> {
    return this.http.delete<T>(
      this.getUrl(`deletar/${form.idPrivado}`),
      this.getHeader()
    );
  }

  getEntity(entity: string = this.entity): string {
    return this.getUri(entity);
  }

  getUrl(url?: string, entity: string = this.entity): string {
    return `${this.getUri(entity)}${
      url ? (url?.startsWith('&') ? url : `/${url}`) : ''
    }`;
  }

  getToken(): string {
    return window.sessionStorage.getItem('token') ?? '';
  }
  setToken(token: string): void {
    this.clearToken();
    window.sessionStorage.setItem('token', token);
  }
  clearToken(): void {
    window.sessionStorage.removeItem('token');
  }
}
