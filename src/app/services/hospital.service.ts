import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { Hospital } from '../models/hospital.model';

const base_url:string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  constructor(private http:HttpClient) { }


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



  loadHospitals() {
    const url = `${base_url}/hospitals`;
    return this.http.get(url, this.headers).pipe(map((response:{ok:boolean, hospitals:Hospital[]}) => response.hospitals));
  }

  createHospital(name:string) {
    const url = `${base_url}/hospitals`;
    return this.http.post(url, {name}, this.headers);
  }

  updateHospital(id_hospital:string, name:string) {
    const url = `${base_url}/hospitals/${id_hospital}`;
    return this.http.put(url, {name}, this.headers);
  }

  deleteHospital(id_hospital:string) {
    const url = `${base_url}/hospitals/${id_hospital}`;
    return this.http.delete(url, this.headers);
  }

}
