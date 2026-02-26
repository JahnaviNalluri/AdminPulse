import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

login(data: any) {
  return this.http.post<any>(`${this.apiUrl}/user/login`, data)
    .pipe(
      tap(res => {
        localStorage.setItem('user', JSON.stringify(res));
        localStorage.setItem('token', res.token);
      })
    );
}

  logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }
}