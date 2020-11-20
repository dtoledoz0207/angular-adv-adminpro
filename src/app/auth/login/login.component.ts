import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted:boolean = false;

  public loginForm = this.formBuilder.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberme: [false]
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

  login() {
    //this.router.navigateByUrl('/');
    this.userService.login(this.loginForm.value).subscribe(response => {
      console.log(response);

      if (this.loginForm.get('rememberme').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('email');
      }
    }, ({error}) => {
      Swal.fire('Error', error.message, 'error');
    });
  }

}
