import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    });
  }

  changeImage(file:File) {
    console.log(file);
    this.imageToUpload = file;
  }

  uploadImage() {
    this.fileUploadService.updatePhoto(this.imageToUpload, 'users', this.user.uid).then(img => {
      console.log(img);
    });
  }

}
