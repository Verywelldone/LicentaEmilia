import {Component} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {OrderControllerService, OrderForm, OrderProduct} from "../../../api";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [OrderControllerService]
})
export class CartComponent {

  items: OrderProduct[];

  constructor(private cartService: CartService, private orderService: OrderControllerService, private tokenService: TokenStorageService) {
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

  onOrderSubmit() {
    this.items.forEach(item => {
      // @ts-ignore
      item.totalPrice = this.getOrderPrice(item);
    })

    const userId = this.tokenService.getUser().id;
    let orderForm: OrderForm = {
      productOrders: this.items,
      userId: userId
    }
    this.orderService.createUsingPOST(orderForm).subscribe(() => {

      this.items = [];
      this.cartService.setCartData([]);

      window.location.reload();
    });

  }
}
