import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user:User;
  public imageToUpload: File;
  public imgTemp:any = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private fileUploadService: FileUploadService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  updateProfile() {
    this.userService.updateUser(this.profileForm.value).subscribe(() => {
      //console.log(response);
      const {name, email} = this.profileForm.value;
      this.user.name = name;
      this.user.email = email;

      Swal.fire('Success', 'Changes were saved', 'success');
    }, ({error}) => {
      Swal.fire('Error', error.message, 'error');
    });
  }

  changeImage(file:File) {
    console.log(file);
    this.imageToUpload = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadImage() {
    this.fileUploadService.updatePhoto(this.imageToUpload, 'users', this.user.uid).then(img => {
      this.user.img = img;
      Swal.fire('Success', 'Photo updated', 'success');
    }).catch(error => {
      console.log(error);
      Swal.fire('Error', 'Something was wrong', 'error');
    });
  }

}
