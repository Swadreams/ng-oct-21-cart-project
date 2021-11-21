import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdcutService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  productCount = 0;
  isLogin = false;

  constructor(private productService: ProdcutService, private router: Router) {}

  ngOnInit(): void {
    const session = sessionStorage.getItem('session');
    if (session) {
      this.isLogin = true;
    }

    this.productService.cartLength.subscribe((length: any) => {
      this.productCount = length;
    });
  }

  logout() {
    sessionStorage.clear();
    this.isLogin = false;
    this.router.navigate(['/login']);
  }
}
