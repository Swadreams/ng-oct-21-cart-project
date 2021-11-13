import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 },
  };

  productId: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // console.log(this.route.snapshot.params.id);
    // this.route.params.subscribe((param) => console.log(param));
    // this.route.paramMap.subscribe((param) => console.log(param));
    // this.route.queryParams.subscribe((params) => console.log(params));
    this.productId = this.route.snapshot.params.id;
  }

  navigateToRating() {
    this.router.navigate(['rating'], { relativeTo: this.route });
  }
}
