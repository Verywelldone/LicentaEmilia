import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../api";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  constructor() {
  }

  @Input()
  product: Product;

  /*  @Output()
    productEventEmitter: EventEmitter<String> = new EventEmitter<String>();*/

  ngOnInit(): void {
  }

  addToCart() {
    console.log(this.product.id);
  }
}
