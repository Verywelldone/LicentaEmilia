import {Injectable} from '@angular/core';
import {OrderProduct} from "../api";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: OrderProduct[] = [];

  totalPrice: number;

  constructor() {
  }

  addToCart(orderProduct: OrderProduct) {
    // @ts-ignore
    orderProduct.totalPrice = orderProduct.productItem?.price * orderProduct.quantity
    if (!this.items) {
      this.items = [];
    }
    if (this.items.includes(orderProduct)) {
      // @ts-ignore
      this.items.find(product => product.product).quantity += orderProduct.quantity;
    } else {
      this.items.push(orderProduct)
    }

    this.saveInLocalStorage();
    this.calculateTotalPrice();

  }

  getItems() {
    this.items = JSON.parse(<string>localStorage.getItem('products'));
    if (this.items) {
      this.calculateTotalPrice();
      return this.items;
    } else
      return [];
  }

  deleteItemFromCart(item: OrderProduct) {
    const index: number = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    this.calculateTotalPrice();

  }

  clearCart() {

    this.items = [];
    this.getItems();
    this.calculateTotalPrice();

  }

  saveInLocalStorage() {
    this.calculateTotalPrice();
    window.localStorage.setItem("products", JSON.stringify(this.items));
  }

  calculateTotalPrice() {
    let sum: number = 0;
    this.items.forEach(element => {
      console.log(element?.totalPrice)
      // @ts-ignore
      sum = sum + element?.totalPrice;
    })
    this.totalPrice = sum;
  }

}
