import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm = this.formBuilder.group({
    name: ['David', Validators.required],
    email: ['test100@gmail.com', Validators.required],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terms: [false, Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  createUser() {
    console.log(this.registerForm.value);
  }

}
