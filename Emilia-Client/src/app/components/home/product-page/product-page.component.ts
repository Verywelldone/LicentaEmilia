import {Component, OnInit} from '@angular/core';
import {OrderProduct, Product, ProductControllerService} from "../../../api";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CartService} from "../../../services/cart.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  providers: [ProductControllerService, MessageService]
})
export class ProductPageComponent implements OnInit {
  product: Product;
  quantity: any;
  private sub: any;
  private productId: number;
  addToCartButtonLabel: any;

  constructor(private messageService: MessageService, private productService: ProductControllerService, private route: ActivatedRoute, private cartService: CartService) {
  }

  ngOnInit(): void {

    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      // @ts-ignore
      this.productId = params.get('productId');

    })


    this.productService.getProductByIdUsingGET(this.productId).subscribe(res => {
      this.product = res;
    });

  }

  addToCart() {
    let orderProduct: OrderProduct = {
      productItem: this.product,
      quantity: this.quantity
    }
    console.log(orderProduct)
    this.cartService.addItem(orderProduct);
    this.messageService.add({key: 'tc', severity: 'success', summary: 'Success!', detail: 'Product added to cart!'});
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
