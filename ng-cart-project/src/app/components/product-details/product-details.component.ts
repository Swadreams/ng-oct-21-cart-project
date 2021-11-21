import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdcutService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  error = '';

  // {
  //   id: 1,
  //   title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  //   price: 109.95,
  //   description:
  //     'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  //   category: "men's clothing",
  //   image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  //   rating: { rate: 3.9, count: 120 },
  // };

  productId: string = '';
  loader = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProdcutService
  ) {}

  ngOnInit(): void {
    // console.log(this.route.snapshot.params.id);
    // this.route.params.subscribe((param) => console.log(param));
    // this.route.paramMap.subscribe((param) => console.log(param));
    // this.route.queryParams.subscribe((params) => console.log(params));
    this.productId = this.route.snapshot.params.id;
    this.getProductDetails();
  }

  getProductDetails() {
    this.loader = true;
    this.productService
      .getProduct(this.productId)
      .subscribe(
        (response) => {
          this.product = response;
        },
        (error) => {
          this.error = error.error.message;
        }
      )
      .add(() => {
        this.loader = false;
      });
  }

  navigateToRating() {
    this.router.navigate(['rating'], { relativeTo: this.route });
  }

  navigateToProduct() {
    this.router.navigate(['/products']);
  }
}
