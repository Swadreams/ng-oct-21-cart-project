import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ProdcutService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../shared/form.style.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProdcutService
  ) {}

  ngOnInit(): void {}

  onLogin(form: any) {
    console.log(form.value);
    this.isLoading = true;
    this.authService
      .login(form.value)
      .subscribe(
        (response: any) => {
          sessionStorage.setItem('session', JSON.stringify(response.user));
          this.getCartItems();
          this.router.navigate(['/products']);
        },
        (error) => {
          this.error = error.error.message;
        }
      )
      .add(() => {
        this.isLoading = false;
      });
  }

  getCartItems() {
    this.productService.getCart().subscribe(
      (response: any) => {
        this.productService.addAllItemsToCart(response);
        console.log('Cart items response :', response);
      },
      (error) => {
        console.log('Cart items error :', error);
      }
    );
  }
}
