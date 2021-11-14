import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../shared/form.style.css', './signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  signUpForm: any;

  get username() {
    return this.signUpForm.controls.username;
  }

  get password() {
    return this.signUpForm.controls.password;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    // this.signUpForm = new FormGroup({
    //   username: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl(''),
    // });
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSignup() {
    console.log(this.signUpForm);
  }
}
