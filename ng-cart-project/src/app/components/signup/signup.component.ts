import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../shared/form.style.css', './signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor() {}

  signUpForm: any;

  get username() {
    return this.signUpForm.controls.username;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
    });
  }

  onSignup() {
    console.log(this.signUpForm);
  }
}
