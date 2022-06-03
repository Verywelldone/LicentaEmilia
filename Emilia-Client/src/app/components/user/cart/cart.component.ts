import {Component} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {OrderProduct} from "../../../api";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  items: OrderProduct[] = this.cartService.getItems();
  totalPriceForAllProducts: string;

  constructor(private cartService: CartService) {
    this.getTotalPrice();
  }

  getTotalPrice() {
    console.log("changing")
    this.totalPriceForAllProducts = parseFloat(String(this.cartService.totalPrice)).toFixed(2);
  }

  getOrderPrice(item: OrderProduct) {
    // @ts-ignore

    return parseFloat(String(item.quantity * item.productItem?.price)).toFixed(2);

  }

  deleteFromCart(item: OrderProduct) {
    this.cartService.deleteItemFromCart(item);
    this.getTotalPrice();
  }
}
