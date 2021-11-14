import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

function forbiddenNameValidator(
  control: AbstractControl,
  word: string
): { [key: string]: boolean } | null {
  return control.value.includes('admin') ? { forbidden: true } : null;
}

function forbiddenNameValidator1(restrictedWord: string) {
  return (control: AbstractControl) =>
    control.value.includes(restrictedWord) ? { forbidden: true } : null;
}

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
      username: [
        '',
        [
          Validators.required,
          Validators.email,
          forbiddenNameValidator1('admin'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          forbiddenNameValidator1('password'),
        ],
      ],
    });
  }

  onSignup() {
    console.log(this.signUpForm);
  }
}
