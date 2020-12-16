import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Doctor } from '../models/doctor.model';

const base_url:string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  loadDoctors() {
    const url = `${base_url}/doctors`;
    return this.http.get(url, this.headers).pipe(map((response:{ok:boolean, doctors:Doctor[]}) => response.doctors));
  }

  getDoctorById(idDoctor:string) {
    const url = `${base_url}/doctors/${idDoctor}`;
    return this.http.get(url, this.headers).pipe(map((response:{ok:boolean, doctor:Doctor}) => response.doctor));
  }

  createDoctor(doctor: {name: string, hospital: string}) {
    const url = `${base_url}/doctors`;
    return this.http.post(url, doctor, this.headers);
  }

  updateDoctor(doctor:Doctor) {
    const url = `${base_url}/doctors/${doctor.id}`;
    return this.http.put(url, doctor, this.headers);
  }

  deleteDoctor(id_doctor:string) {
    const url = `${base_url}/doctors/${id_doctor}`;
    return this.http.delete(url, this.headers);
  }
}
