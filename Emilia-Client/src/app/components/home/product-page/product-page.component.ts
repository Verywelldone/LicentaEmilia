import {Component, OnInit} from '@angular/core';
import {Product, ProductControllerService} from "../../../api";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  providers: [ProductControllerService]
})
export class ProductPageComponent implements OnInit {
  product: Product;
  quantity: any;
  private sub: any;
  private productId: number;
  addToCartButtonLabel: any;

  constructor(private productService: ProductControllerService, private route: ActivatedRoute, private cartService: CartService) {
  }

  ngOnInit(): void {

    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      // @ts-ignore
      this.productId = params.get('productId');

    })


    this.productService.getOneUsingGET2(this.productId).subscribe(res => {
      this.product = res;
    });

  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  quantityIsGreaterThanStock() {
    // @ts-ignore
    if (this.quantity > this.product?.stock) {
      this.addToCartButtonLabel = 'Cart exceeds stock limit'
    } else {
      this.addToCartButtonLabel = 'Add to cart';
    }
    // @ts-ignore
    return this.quantity > this.product?.stock;
  }
}
