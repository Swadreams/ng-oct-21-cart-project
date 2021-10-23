import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from 'src/app/shared/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products = PRODUCTS;

  showGreen = false;

  constructor() {}

  ngOnInit(): void {}
}
