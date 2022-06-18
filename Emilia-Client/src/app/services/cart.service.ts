import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {OrderProduct} from "../api";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // @ts-ignore
  cartItems = new BehaviorSubject([]);
  placeholder = this.getCartData() || [];

  constructor(private tokenStorage: TokenStorageService) {
    // @ts-ignore
    const ls = this.getCartData();
    if (ls) this.cartItems.next(ls);
  }

  addItem(product: OrderProduct) {
    console.log(product);
    const ls = this.getCartData();
    let exist: OrderProduct;

    if (ls) {
      console.log(ls)
      exist = ls.find((item: OrderProduct) => {
        return item.productItem!.id === product.productItem!.id;
      });
    }
    // @ts-ignore
    if (exist != null) {
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
    let user = this.tokenStorage.getUser();
    if (user != null) {
      localStorage.setItem('cart_' + user.id, JSON.stringify(data));
    }
  }

  getCartData() {
    let user = this.tokenStorage.getUser();
    if (user != null) {
      return JSON.parse(<string>localStorage.getItem('cart_' + user.id));
    }
  }

  deleteItemFromCart(item: OrderProduct) {

  }
}
