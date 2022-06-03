import {Component} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {OrderProduct} from "../../../api";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  items: OrderProduct[];
  totalPriceForAllProducts: string;

  constructor(private cartService: CartService) {
    cartService.cartItems.subscribe(res => this.items = res);
    this.getTotalPrice();
  }

  getTotalPrice() {
    let sum: number = 0;
    this.items.forEach((item) => {
      sum += Number(parseFloat(this.getOrderPrice(item)).toFixed(2));
    })
    return parseFloat(String(Number(sum))).toFixed(2);
  }

  getOrderPrice(item: OrderProduct) {
    // @ts-ignore

    return parseFloat(item.quantity * item.productItem?.price).toFixed(2);

  }

  deleteFromCart(item: OrderProduct) {
    this.items.splice(this.items.indexOf(item), 1);
    this.cartService.setCartData(this.items);
  }

  calculateTotal() {
    return parseFloat(String(Number(this.getTotalPrice()) + Number(this.getTotalPrice()) * 19 / 100)).toFixed(2);
  }
}
