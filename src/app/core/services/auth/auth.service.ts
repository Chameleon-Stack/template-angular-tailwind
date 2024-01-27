import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '@environments/environment';
import { Session } from '@interfaces/session/session.interface';
import { User } from '@interfaces/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(session: { email: string; password: string }): Observable<Session> {
    return this.http.post<Session>(`${this.baseUrl}/user/session`, session);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): Observable<User | null> {
    const user = localStorage.getItem('user');
    if (user) {
      return of(JSON.parse(user));
    } else {
      return of(null);
    }
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
}
