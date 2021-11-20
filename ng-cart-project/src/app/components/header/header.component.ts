import { Component, OnInit } from '@angular/core';
import { ProdcutService } from 'src/app/shared/prodcut.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  productCount = 0;
  isLogin = false;

  constructor(private productService: ProdcutService) {}

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
  }
}
