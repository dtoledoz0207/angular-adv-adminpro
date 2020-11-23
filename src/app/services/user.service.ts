import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

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

  googleInit() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '57650590592-v2u0icn5iv0snveeoh1vividcss7p4pr.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/auth/google`, {token}).pipe(tap((response: any) => {
      localStorage.setItem('token', response.token);
    }));
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
