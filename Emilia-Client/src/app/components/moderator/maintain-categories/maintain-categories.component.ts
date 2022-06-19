import {Component, OnInit} from '@angular/core';
import {ProductCategory, ProductCategoryControllerService} from "../../../api";
import {finalize, Observable, of, shareReplay, take} from "rxjs";

@Component({
  selector: 'app-maintain-categories',
  templateUrl: './maintain-categories.component.html',
  styleUrls: ['./maintain-categories.component.scss'],
  providers: [ProductCategoryControllerService]
})
export class MaintainCategoriesComponent implements OnInit {
  categories$: Observable<Array<ProductCategory>> = of([]);
  loading: boolean = false;

  constructor(private categoryService: ProductCategoryControllerService) {
  }

  ngOnInit(): void {
    this.loadAllCategories();
  }

  deleteCategory($event: any) {
    console.log($event)
    // this.categoryService.deleteProductCategoryUsingDELETE($event.id);

  }

  editCategory($event: any) {

  }

  loadAllCategories() {
    this.categories$ = this.categoryService.getAllProductCategoriesUsingGET().pipe(
      shareReplay(),
      take(1),
      finalize(() => this.loading = false));
  }
}
