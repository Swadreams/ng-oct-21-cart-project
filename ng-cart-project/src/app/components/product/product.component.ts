import { Component, OnInit } from '@angular/core';

import { IProduct } from 'src/app/shared/product.interface';
import { ProdcutService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];
  error: any;
  loader = false;

  showGreen = false;

  constructor(private productService: ProdcutService) {}

  ngOnInit(): void {
    // this.products = this.productService.getProducts();

    this.loader = true;
    this.productService
      .getProducts()
      .subscribe(
        (res: IProduct[]) => (this.products = res),
        (err: any) => (this.error = err.message)
      )
      .add(() => {
        this.loader = false;
      });
  }

  onAddToCart(product: IProduct): void {
    this.productService.addToCart(product);
  }
}
