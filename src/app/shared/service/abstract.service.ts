import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AbstractService {
  @Injectable() public entity: string;
  constructor(@Inject('entity') entity: string, public http: HttpClient) {
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

  getAll(params: {
    entity?: string;
    title: string;
    query?: any;
    take?: number;
    skip?: number;
    all?: boolean;
  }): Observable<any> {
    console.log('chegou aqui');

    const {
      entity = this.entity,
      title,
      query,
      take = 10,
      skip = 1,
      all = true,
    } = params;
    let data;
    const headers = this.createHeader();
    return this.http.get<any>(this.getUrl(), { headers });
    console.log(data);
    return data;
  }

  getEntity(entity: string = this.entity): string {
    return this.getUri(entity);
  }

  getUrl(entity: string = this.entity, url?: string): string {
    return `${this.getUri(entity)}/${url ? url : ''}`;
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
