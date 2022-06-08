import {Component, Injectable} from '@angular/core';
import {MessageService} from "primeng/api";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs";
import {ProductCategory, ProductCategoryControllerService} from "../../../api";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  providers: [MessageService, ProductCategoryControllerService]
})
@Injectable()
export class CategoryPageComponent {

  productList: Observable<ProductCategory>;
  quantity: any;
  private sub: any;
  private categoryId: number;

  constructor(private messageService: MessageService,
              private categoryService: ProductCategoryControllerService,
              private route: ActivatedRoute) {

    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      // @ts-ignore
      this.categoryId = params.get('categoryId');
      this.productList = this.categoryService.getProductCategoryByIdUsingGET(this.categoryId);
      this.productList.subscribe();

    })

  }

}
