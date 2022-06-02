import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {OrderProduct, Product} from "../../../api";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: OrderProduct[] = this.cartService.getItems();

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  getTotalprice(item: OrderProduct) {
    // @ts-ignore
    return parseFloat(item.quantity * item.productItem?.price).toFixed(2);
  }
}
