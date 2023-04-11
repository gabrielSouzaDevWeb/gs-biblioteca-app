import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { IQueryParams } from 'src/app/application/lib/interface/table.interface';

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

  getUri(entity: string = this.entity): string {
    const uris: { [key: string]: string } = {
      [`aluno`]: this.getUriByEnviroment({
        port: 3000,
        entity: 'aluno',
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

  createHeader(authToken: string | null = this.getToken()): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
  }

  getAll(params: IQueryParams): Observable<any> {
    console.log('chegou aqui');

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

    console.log(query);
    // console.log(uri);

    let data;
    const headers = this.createHeader();
    return this.http.get<any>(this.getUrl(query), { headers });
    console.log(data);
    return data;
  }

  getEntity(entity: string = this.entity): string {
    return this.getUri(entity);
  }

  getUrl(url?: string, entity: string = this.entity): string {
    return `${this.getUri(entity)}${url ? url : ''}`;
  }

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
