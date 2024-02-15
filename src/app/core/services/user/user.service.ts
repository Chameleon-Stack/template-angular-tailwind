import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@interfaces/user/user.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  create(user: User | FormData): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user`, user);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/user/${id}`);
  }

  get(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`);
  }

  update(id: string, user: User | FormData): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/user/${id}`, user);
  }
}
