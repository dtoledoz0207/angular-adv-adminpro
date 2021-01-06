import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoadUsers } from '../interfaces/load-users.interface';

import { User } from '../models/user.model';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: User;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role;
  }

  get uid():string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  saveLocalStorage(token:string, menu:any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }



  validateToken(): Observable<boolean> {

    return this.http.get(`${base_url}/auth/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(map((response:any) => {

      const { uid, name, email, img = '', role, google } = response.user;

      this.user = new User(name, email, '', img, google, role, uid);

      this.saveLocalStorage(response.token, response.menu);

      return true;
    }),
    catchError(error => of(false)));
  }

  createUser(formData:RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(tap((response: any) => {
      this.saveLocalStorage(response.token, response.menu);
    }));
  }

  updateUser(data: {email:string, name: string, role: string}) {

    data = {
      ...data,
      role: this.user.role
    };

    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/auth`, formData).pipe(tap((response: any) => {
      this.saveLocalStorage(response.token, response.menu);
    }));
  }

  googleInit() {
    return new Promise<void>(resolve => {
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
      this.saveLocalStorage(response.token, response.menu);
    }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  loadUsers(from:number = 0) {
    const url = `${base_url}/users?from_the=${from}`;
    return this.http.get<LoadUsers>(url, this.headers).pipe(map(resp => {
      const users = resp.users.map(user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid));
      return {
        total: resp.total,
        users
      };
    }));
  }

  deleteUser(user:User) {
    const url = `${base_url}/users/${user.uid}`;
    return this.http.delete(url, this.headers);
  }

  saveChangesUser(user:User) {
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }
}
