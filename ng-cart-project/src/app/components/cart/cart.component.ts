import { Component, OnInit } from '@angular/core';
import { ProdcutService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  showLoading = false;

  constructor(private productService: ProdcutService) {}

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
        () => {
          alert('Can not delete item at the moment.');
        }
      )
      .add(() => {
        this.showLoading = false;
      });
  }
}
