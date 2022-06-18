import {Component, OnInit} from '@angular/core';
import {ProductControllerService, ProductItem} from "../../../api";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recommended-products',
  templateUrl: './recommended-products.component.html',
  styleUrls: ['./recommended-products.component.scss']
})
export class RecommendedProductsComponent implements OnInit {
  products$: Observable<Array<ProductItem>>;
  productList: [];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(private productService: ProductControllerService) {
  }

  ngOnInit(): void {
    this.products$ = this.productService.getRandomProductsUsingGET();
    // @ts-ignore
    this.products$.subscribe(res => this.productList = res);
  }
}
