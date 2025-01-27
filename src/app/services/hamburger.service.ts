import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ihamburger, IhamburgerPage } from '../interfaces/hamburger';

@Injectable({
  providedIn: 'root'
})
export class HamburgerService {

  private baseUrl = "hamburgers";

  constructor(private http: HttpClient) { }

  public getAll(page = 0, size = 10): Observable<IhamburgerPage> {
    return this.http.get<IhamburgerPage>(this.baseUrl + "?page=" + page + "&size="+ size);
  }

  public getById(id: number): Observable<Ihamburger> {
    return this.http.get<Ihamburger>(this.baseUrl + "/" + id);
  }

  public getByDescription(description: string, page = 0, size = 10): Observable<IhamburgerPage> {
    return this.http.get<IhamburgerPage>(this.baseUrl + '/' + description + "?page=" + page + "&size="+ size);
  }

  public post(hamburger: Ihamburger): Observable<void> {
    return this.http.post<void>(this.baseUrl, hamburger);
  }

  public patch(ingredient: Ihamburger): Observable<Ihamburger> {
    return this.http.patch<Ihamburger>(this.baseUrl + '/' + ingredient.code, ingredient);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + id);
  }

}
