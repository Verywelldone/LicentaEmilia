import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../api";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  stockStatus: string;
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  @Input()
  product: Product;
  quantity: number;

  constructor(private cartService: CartService) {
  }

  /*  @Output()
    productEventEmitter: EventEmitter<String> = new EventEmitter<String>();*/

  ngOnInit(): void {
    // @ts-ignore
    if (this.product.stock > 10) {
      this.stockStatus = 'INSTOCK';
    }

    // @ts-ignore
    if (this.product.stock < 10 && this.product.stock > 0) {
      this.stockStatus = 'LOWSTOCK'
    }

    // @ts-ignore
    if (this.product.stock == 0) {
      this.stockStatus = 'OUTOFSTOCK'
    }
    this.validateProduct(this.product);
  }

  // addToCart() {
  //   this.cartService.addToCart(this.product);
  // }

  validateProduct(token: Product) {
    return token;
  }
}
