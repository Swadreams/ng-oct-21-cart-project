import { Injectable } from '@angular/core';
import { PRODUCTS } from './products';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './product.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdcutService {
  cartItems: IProduct[] = [];
  // cartLength = new Subject();
  cartLength = new BehaviorSubject(0);
  constructor(private http: HttpClient) {}

  getProducts(): any {
    return this.http.get('https://node-merncart.vercel.app/product');
  }

  getProduct(id: string) {
    return this.http.get(`https://node-merncart.vercel.app/product/${id}`);
  }

  addToCart(item: IProduct) {
    this.cartItems.push(item);
    this.cartLength.next(this.cartItems.length);
    // console.log('Number of items in cart :', this.cartItems.length);
  }
}
