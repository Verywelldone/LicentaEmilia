import {Component, OnInit} from '@angular/core';
import {Product, ProductControllerService} from "../../../api";
import {ActivatedRoute, ParamMap} from "@angular/router";

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

  constructor(private productService: ProductControllerService, private route: ActivatedRoute) {
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
    console.log(this.product.id);
  }

  quantityIsGreaterThanStock() {
    // @ts-ignore
    return this.quantity > this.product?.stock;
  }
}
