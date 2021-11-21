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
    return this.http.get('/product');
  }

  getProduct(id: string) {
    return this.http.get(`/product/${id}`);
  }

  addAllItemsToCart(items: IProduct[]) {
    this.cartItems = items;
    this.cartLength.next(this.cartItems.length);
  }

  addToCart(item: IProduct) {
    this.cartItems.push(item);
    this.cartLength.next(this.cartItems.length);
    item.quantity = 1;
    this.addCartItem(item).subscribe(
      (response: any) => {
        alert(response.message);
      },
      (error) => {
        console.log('add cart message', error);
      }
    );
    // console.log('Number of items in cart :', this.cartItems.length);
  }

  getCart() {
    return this.http.get('/cart');
  }

  addCartItem(item: any) {
    return this.http.post('/cart', item);
  }

  deleteCartItem(id: String) {
    return this.http.delete(`/cart/${id}`);
  }

  emptyCart() {
    return this.http.delete('/cart');
  }
}
