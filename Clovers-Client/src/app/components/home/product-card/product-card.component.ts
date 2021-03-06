import {Component, Input, OnInit} from '@angular/core';
import {ProductItem, UserControllerService} from "../../../api";
import {TokenStorageService} from "../../../services/token-storage.service";

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
  product: ProductItem;
  @Input()
  isFromFavoriteList: boolean;
  quantity: number;
  isUserLoggedIn: boolean;

  constructor(private userService: UserControllerService, private tokenService: TokenStorageService) {
  }

  /*  @Output()
    productEventEmitter: EventEmitter<String> = new EventEmitter<String>();*/

  ngOnInit(): void {

    this.isUserLoggedIn = this.tokenService.getUser() !== null;
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

  validateProduct(token: ProductItem) {
    return token;
  }

  addToFavorites() {
    this.userService.addUserFavoriteProductUsingPOST(this.product).subscribe();
  }

  removeFromFavorites() {
    this.userService.removeUserFavoriteProductUsingPOST(this.product).subscribe();
  }
}
