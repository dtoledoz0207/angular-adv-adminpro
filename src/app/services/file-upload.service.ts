import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updatePhoto(file:File, type: 'users' | 'doctors' | 'hospitals', id:string) {
    try {

      const url:string = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      }).then(res => res.json());

      console.log(response);

      return 'image name';

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
