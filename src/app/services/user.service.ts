import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

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
