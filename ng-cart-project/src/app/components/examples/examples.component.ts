import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css'],
})
export class ExamplesComponent implements OnInit {
  firstNumber: number = 0;
  secondNumber: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
