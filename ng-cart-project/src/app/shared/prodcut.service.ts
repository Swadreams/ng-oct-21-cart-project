import { Injectable } from '@angular/core';
import { PRODUCTS } from './products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdcutService {
  constructor(private http: HttpClient) {}

  getProducts(): any {
    return this.http.get('https://fakestoreapi.com/products');
  }
}
