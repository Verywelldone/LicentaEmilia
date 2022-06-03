import {Component, OnInit} from '@angular/core';
import {OrderProduct} from "../../../api";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  products: OrderProduct[]
  subtotal: number

  constructor(private cartService: CartService) {
    // this.products = cartService.getItems();
    // this.subtotal = cartService.totalPrice;
  }

  ngOnInit(): void {

  }

}
