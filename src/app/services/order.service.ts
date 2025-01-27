import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iorder, IorderPage } from '../interfaces/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'orders';

  constructor(private http: HttpClient) { }

  public getAll(page = 0, size = 10): Observable<IorderPage> {
        return this.http.get<IorderPage>(this.baseUrl + "?page=" + page + "&size="+ size);
      }
    
      public getById(id: number): Observable<Iorder> {
        return this.http.get<Iorder>(this.baseUrl + '/' + id)
      }
    
      public getByDescription(description: string, page = 0, size = 10): Observable<IorderPage> {
        return this.http.get<IorderPage>(this.baseUrl + '/' + description + "?page=" + page + "&size="+ size);
      }
    
      public post(order: Iorder): Observable<void> {
        return this.http.post<void>(this.baseUrl, order);
      }
    
      public patch(order: Iorder): Observable<Iorder> {
        return this.http.patch<Iorder>(this.baseUrl + '/' + order.code, order);
      }
    
      public delete(code: number): Observable<void> {
        return this.http.delete<void>(this.baseUrl + '/' + code);
      }
}
