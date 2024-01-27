import { Card } from '@interfaces/card/card.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  create(userId: string, card: Card): Observable<Card> {
    return this.http.post<Card>(`${this.baseUrl}/card/${userId}`, card);
  }

  get(userId: string, filters?: Partial<Card>): Observable<Card[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach((key) => {
        const value = filters[key as keyof Card];
        if (value !== null && value !== undefined) {
          params = params.append(key, value.toString());
        }
      });
    }
    return this.http.get<Card[]>(`${this.baseUrl}/card/${userId}`, { params });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/card/${id}`);
  }

  update(id: string, card: Card): Observable<Card> {
    return this.http.patch<Card>(`${this.baseUrl}/card/${id}`, card);
  }
}
