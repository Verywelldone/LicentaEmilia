import {Injectable} from '@angular/core';
import {Order, OrderProduct, Product} from "../api";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: OrderProduct[] = [];

  constructor() {
  }

  addToCart(orderProduct: OrderProduct) {
    if(!this.items){
      this.items = [];
    }
    if (this.items.includes(orderProduct)) {
      // @ts-ignore
      this.items.find(product => product.product).quantity += orderProduct.quantity;
    } else {
      this.items.push(orderProduct)
    }

    this.saveInLocalStorage();
  }

  getItems() {
    console.log(JSON.parse(<string>localStorage.getItem('products')));

    this.items = JSON.parse(<string>localStorage.getItem('products'));
    if (this.items)
      return this.items;
    else
      return [];
  }

  clearCart() {
    this.items = [];
    this.getItems();
  }

  saveInLocalStorage() {
    window.localStorage.setItem("products", JSON.stringify(this.items));
  }

}
