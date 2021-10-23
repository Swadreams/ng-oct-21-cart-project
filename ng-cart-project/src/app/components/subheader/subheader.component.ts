import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css'],
})
export class SubheaderComponent implements OnInit {
  category = [
    {
      title: 'All Products',
      imageUrl:
        'https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
