import {Component, OnInit} from '@angular/core';
import {OrderProduct, ProductControllerService, ProductItem, UserControllerService} from "../../../api";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CartService} from "../../../services/cart.service";
import {MessageService} from "primeng/api";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  providers: [ProductControllerService, MessageService, UserControllerService]
})
export class ProductPageComponent implements OnInit {
  product: ProductItem;
  quantity: number = 1;
  private sub: any;
  productId: number;
  addToCartButtonLabel: any;

  isUserLoggedIn: boolean;

  constructor(private messageService: MessageService,
              private productService: ProductControllerService,
              private route: ActivatedRoute,
              private tokenService: TokenStorageService,
              private userService: UserControllerService,
              private cartService: CartService) {
  }

  ngOnInit(): void {

    this.isUserLoggedIn = this.tokenService.getUser() !== null;
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      // @ts-ignore
      this.productId = params.get('productId');

    })

    this.productService.getProductByIdUsingGET(this.productId).subscribe(res => {
      this.product = res;
    });

  }

  addToFavorites() {
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: 'Success!',
      detail: 'Product added to favorites!'
    });
    this.userService.addUserFavoriteProductUsingPOST(this.product).subscribe();
  }

  addToCart() {
    let orderProduct: OrderProduct = {
      productItem: this.product,
      quantity: this.quantity
    }
    this.cartService.addItem(orderProduct);
    this.messageService.add({key: 'tc', severity: 'success', summary: 'Success!', detail: 'Product added to cart!'});
  }

  quantityIsGreaterThanStock() {
    if (this.quantity > this.product?.stock) {
      this.addToCartButtonLabel = 'Cart exceeds stock limit'
      return true;
    } else {
      this.addToCartButtonLabel = 'Add to cart';
      return false
    }
  }
}
