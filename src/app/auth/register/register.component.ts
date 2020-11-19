import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted:boolean = false;

  public registerForm = this.formBuilder.group({
    name: ['David Toledo', Validators.required],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terms: [null, Validators.required]
  }, {
    validators: this.equalsPasswords('password', 'password2')
  });

  constructor(private formBuilder: FormBuilder) { }

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      console.log('posting form');
    } else {
      console.log('Invalid form');
    }
  }

  invalidField(field:string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  invalidPasswords() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    return ((pass1 !== pass2) && this.formSubmitted) ? true : false;
  }

  acceptTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  equalsPasswords(pass1name: string, pass2name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1name);
      const pass2Control = formGroup.get(pass2name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEquals: true});
      }
    }
  }

}
