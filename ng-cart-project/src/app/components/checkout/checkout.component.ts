import { Component, OnInit } from '@angular/core';
import { ProdcutService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  error = '';
  success = '';

  constructor(private productService: ProdcutService) {}

  ngOnInit(): void {
    this.placeOrder();
  }

  placeOrder() {
    this.productService.emptyCart().subscribe(
      () => {
        this.productService.addAllItemsToCart([]);
        this.success = 'Your order placed successfully';
      },
      () =>
        (this.error =
          'Can not place order at the moment. Please try after some time.')
    );
  }
}
