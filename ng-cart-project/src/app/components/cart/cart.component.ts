import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdcutService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  showLoading = false;

  constructor(private productService: ProdcutService, private router: Router) {}

  ngOnInit(): void {
    this.showLoading = true;
    this.getCartItems();
  }

  getCartItems() {
    this.productService
      .getCart()
      .subscribe(
        (response: any) => {
          this.productService.addAllItemsToCart(response);
          this.cartItems = response;
        },
        (error) => {
          if (error.error?.code === 'ERR401') {
            sessionStorage.clear();
            this.router.navigate(['/login']);
          }
          console.log('Cart items error :', error);
        }
      )
      .add(() => {
        this.showLoading = false;
      });
  }

  deleteItem(id: string) {
    this.productService
      .deleteCartItem(id)
      .subscribe(
        () => {
          this.getCartItems();
          alert('Item deleted successfully');
        },
        (error) => {
          if (error.erorr.code === 'ERR401') {
          }
          console.log(error);
          alert('Can not delete item at the moment.');
        }
      )
      .add(() => {
        this.showLoading = false;
      });
  }

  emptyCart() {
    this.productService.emptyCart().subscribe(
      () => {
        this.cartItems = [];
        this.productService.addAllItemsToCart([]);
        alert('Cart items removed successfully');
      },
      () =>
        alert('Can not remove items at the moment. Please try after some time.')
    );
  }
}
