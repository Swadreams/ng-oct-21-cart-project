import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../shared/form.style.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(form: any) {
    console.log(form.value);
    this.isLoading = true;
    this.authService
      .login(form.value)
      .subscribe(
        () => {
          this.router.navigate(['/products']);
        },
        (error) => {
          this.error = error.message;
        }
      )
      .add(() => {
        this.isLoading = false;
      });
  }
}
