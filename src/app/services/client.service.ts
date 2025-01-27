import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iclient, IclientPage } from '../interfaces/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'clients'

  constructor(private http: HttpClient) { }

  public getAll(page = 0, size = 10): Observable<IclientPage> {
        return this.http.get<IclientPage>(this.baseUrl + "?page=" + page + "&size="+ size);
      }
    
      public getById(id: number): Observable<Iclient> {
        return this.http.get<Iclient>(this.baseUrl + '/' + id)
      }
    
      public getByDescription(description: string, page = 0, size = 10): Observable<IclientPage> {
        return this.http.get<IclientPage>(this.baseUrl + '/' + description + "?page=" + page + "&size="+ size);
      }
    
      public post(client: Iclient): Observable<void> {
        return this.http.post<void>(this.baseUrl, client);
      }
    
      public patch(client: Iclient): Observable<Iclient> {
        return this.http.patch<Iclient>(this.baseUrl + '/' + client.code, client);
      }
    
      public delete(code: number): Observable<void> {
        return this.http.delete<void>(this.baseUrl + '/' + code);
      }
}
