import {Component, Input, OnInit} from '@angular/core';
import {Product, UserControllerService} from "../../../api";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  providers: [UserControllerService]
})
export class ProductCardComponent implements OnInit {
  stockStatus: string;
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  @Input()
  product: Product;
  @Input()
  isFromFavoriteList: boolean;

  quantity: number;

  constructor(private userService: UserControllerService) {
  }

  /*  @Output()
    productEventEmitter: EventEmitter<String> = new EventEmitter<String>();*/

  ngOnInit(): void {
    // @ts-ignore
    if (this.product.stock > 10) {
      this.stockStatus = 'INSTOCK';
    }

    // @ts-ignore
    if (this.product.stock < 10 && this.product.stock > 0) {
      this.stockStatus = 'LOWSTOCK'
    }

    // @ts-ignore
    if (this.product.stock == 0) {
      this.stockStatus = 'OUTOFSTOCK'
    }
    this.validateProduct(this.product);
  }

  validateProduct(token: Product) {
    return token;
  }

  addToFavorites() {
    this.userService.addUserFavoriteProductUsingPOST(this.product).subscribe();
  }

  removeFromFavorites() {
    this.userService.removeUserFavoriteProductUsingPOST(this.product).subscribe();
  }
}
