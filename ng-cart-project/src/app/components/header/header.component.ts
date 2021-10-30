import { Component, OnInit } from '@angular/core';
import { ProdcutService } from 'src/app/shared/prodcut.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  productCount = 0;

  constructor(private productService: ProdcutService) {}

  ngOnInit(): void {
    this.productService.cartLength.subscribe((length: any) => {
      this.productCount = length;
    });
  }
}
