import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {Product} from "../../../api";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: Product[] = this.cartService.getItems();

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

}
