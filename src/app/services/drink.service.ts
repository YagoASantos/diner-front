import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Idrink, IdrinkPage } from '../interfaces/drink';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  private baseUrl = 'drinks'

  constructor(private http: HttpClient) { }

  public getAll(page = 0, size = 10): Observable<IdrinkPage> {
      return this.http.get<IdrinkPage>(this.baseUrl + "?page=" + page + "&size="+ size);
    }
  
    public getById(id: number): Observable<Idrink> {
      return this.http.get<Idrink>(this.baseUrl + '/' + id)
    }
  
    public getByDescription(description: string, page = 0, size = 10): Observable<IdrinkPage> {
      return this.http.get<IdrinkPage>(this.baseUrl + '/' + description + "?page=" + page + "&size="+ size);
    }
  
    public post(drink: Idrink): Observable<void> {
      return this.http.post<void>(this.baseUrl, drink);
    }
  
    public patch(drink: Idrink): Observable<Idrink> {
      return this.http.patch<Idrink>(this.baseUrl + '/' + drink.code, drink);
    }
  
    public delete(code: number): Observable<void> {
      return this.http.delete<void>(this.baseUrl + '/' + code);
    }
}
