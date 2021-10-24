import { Component, OnInit } from '@angular/core';
import { ProdcutService } from 'src/app/shared/prodcut.service';
import { PRODUCTS } from 'src/app/shared/products';

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

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
}
