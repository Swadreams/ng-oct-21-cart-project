import { Component, OnInit } from '@angular/core';
import { ProdcutService } from 'src/app/shared/prodcut.service';
import { IProduct } from 'src/app/shared/product.interface';
import { PRODUCTS } from 'src/app/shared/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];
  error: any;

  showGreen = false;

  constructor(private productService: ProdcutService) {}

  ngOnInit(): void {
    // this.products = this.productService.getProducts();

    this.productService.getProducts().subscribe(
      (res: IProduct[]) => (this.products = res),
      (err: any) => (this.error = err.message)
    );
  }

  onAddToCart(product: IProduct): void {
    this.productService.addToCart(product);
  }
}
