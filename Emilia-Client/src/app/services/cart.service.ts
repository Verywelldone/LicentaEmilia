import {Injectable} from '@angular/core';
import {Product} from "../api";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Product[] = [];

  constructor() {
  }

  addToCart(product: Product) {
    this.items.push(product)
    console.log(this.items)
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.getItems();
  }

}
