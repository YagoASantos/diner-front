import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iingredient, IpageIngredients } from '../interfaces/ingredient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private baseUrl = "ingredients";

  constructor(private http: HttpClient) { }

  public getAll(page = 0, size = 10): Observable<IpageIngredients> {
    return this.http.get<IpageIngredients>(this.baseUrl + "?page=" + page + "&size="+ size);
  }

  public getById(id: number): Observable<Iingredient> {
    return this.http.get<Iingredient>(this.baseUrl + '/' + id)
  }

  public getByDescription(description: string, page = 0, size = 10): Observable<IpageIngredients> {
    return this.http.get<IpageIngredients>(this.baseUrl + '/' + description + "?page=" + page + "&size="+ size);
  }

  public post(ingredient: Iingredient): Observable<void> {
    return this.http.post<void>(this.baseUrl, ingredient);
  }

  public patch(ingredient: Iingredient): Observable<Iingredient> {
    return this.http.patch<Iingredient>(this.baseUrl + '/' + ingredient.code, ingredient);
  }

  public delete(code: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/' + code);
  }
}
