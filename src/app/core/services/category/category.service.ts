import { Category } from '@interfaces/category/category.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  create(userId: string, category: Category): Observable<Category> {
    return this.http.post<Category>(
      `${this.baseUrl}/category/${userId}`,
      category
    );
  }

  get(userId: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category/${userId}`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/category/${id}`);
  }
}
