import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(tap((response:any) => {
      localStorage.setItem('token', response.token);
    }),
    map(resp => true),
    catchError(error => of(false)));
  }

  createUser(formData:RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(tap((response: any) => {
      localStorage.setItem('token', response.token);
    }));
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/auth`, formData).pipe(tap((response: any) => {
      localStorage.setItem('token', response.token);
    }));
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/auth/google`, {token}).pipe(tap((response: any) => {
      localStorage.setItem('token', response.token);
    }));
  }
}
