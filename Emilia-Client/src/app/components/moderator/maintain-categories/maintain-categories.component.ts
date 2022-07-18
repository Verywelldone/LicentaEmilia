import {Component, OnInit} from '@angular/core';
import {ProductCategory, ProductCategoryControllerService, ProductItem} from "../../../api";
import {finalize, Observable, of, shareReplay, take} from "rxjs";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-maintain-categories',
  templateUrl: './maintain-categories.component.html',
  styleUrls: ['./maintain-categories.component.scss'],
  providers: [ProductCategoryControllerService]
})
export class MaintainCategoriesComponent implements OnInit {
  categories$: Observable<Array<ProductCategory>> = of([]);
  loading: boolean = false;
  displayAddCategoryModal: boolean = false;
  newCategoryName: any;
  newCategoryDescription: any;

  constructor(private categoryService: ProductCategoryControllerService, private confirmationService: ConfirmationService, private messageService: MessageService, private dialogService: MatDialog) {
  }

  ngOnInit(): void {
    this.loadAllCategories();
  }

  deleteCategory(category: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true;
        setTimeout(() => {

          this.categoryService.deleteProductCategoryUsingDELETE(category.id).pipe(
            shareReplay(),
            take(1),
            finalize(() => this.loading = false)
          ).subscribe({
            next: (v) => this.messageService.add({severity: 'info', summary: 'Confirmed', detail: v}),
            error: (e) => this.messageService.add({severity: 'info', summary: 'Error', detail: e.error.text}),
          });

        }, 2000)

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
            break;
        }
      }
    });

  }

  editCategory($event: any) {
    this.loading = true;
    this.categoryService.updateProductCategoryUsingPUT($event).pipe(shareReplay(),
      take(1),
      finalize(() => this.loading = false)).subscribe();
  }

  loadAllCategories() {
    this.categories$ = this.categoryService.getAllProductCategoriesUsingGET().pipe(
      shareReplay(),
      take(1),
      finalize(() => this.loading = false));
  }

  showDialog() {
    this.displayAddCategoryModal = true;
  }

  saveNewCategory() {
    let productCategory: ProductCategory = {
      name: this.newCategoryName,
      description: this.newCategoryDescription,
      productItems: new Array<ProductItem>()
    }

    this.categoryService.addProductCategoryUsingPOST(productCategory).subscribe();

    window.location.reload();

  }
}
