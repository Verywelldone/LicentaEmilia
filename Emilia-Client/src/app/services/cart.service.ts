import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {OrderProduct} from "../api";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // @ts-ignore
  cartItems = new BehaviorSubject([]);
  placeholder = this.getCartData() || [];

  constructor() {
    // @ts-ignore
    const ls = this.getCartData();
    if (ls) this.cartItems.next(ls);
  }

  addItem(product: OrderProduct) {
    const ls = this.getCartData();
    let exist: OrderProduct = {};

    if (ls)
      exist = ls.find((item: OrderProduct) => {
        console.log("Product already exists: ", item.productItem!.id === product.productItem!.id)
        return item.productItem!.id === product.productItem!.id;
      });

    if (exist) {
      console.log("Product:", exist, "Already exists");
      // @ts-ignore
      exist.quantity += product.quantity;
      this.setCartData(ls);
    } else {
      if (ls) {
        const newData = [...ls, product];
        this.setCartData(newData)
        this.cartItems.next(this.getCartData());
      }
      // @ts-ignore
      this.placeholder.push(product);
      this.setCartData(this.placeholder)
      this.cartItems.next(this.getCartData())
    }
  }

  setCartData(data: any) {
    localStorage.setItem('cart', JSON.stringify(data));
  }

  getCartData() {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('cart'));
  }

  deleteItemFromCart(item: OrderProduct) {

  }
}
