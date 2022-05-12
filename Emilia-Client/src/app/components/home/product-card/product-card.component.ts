import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  constructor() {
  }

  @Output()
  productEventEmitter: EventEmitter<String> = new EventEmitter<String>();

  ngOnInit(): void {
  }


  addToCart() {
    this.productEventEmitter.emit("TEST");
  }
}
