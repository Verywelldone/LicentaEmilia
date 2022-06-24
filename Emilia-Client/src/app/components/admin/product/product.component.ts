import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ConfirmationService, ConfirmEventType, Message, MessageService} from "primeng/api";
import {AddProductModalComponent} from "./add-product-modal/add-product-modal.component";
import {ProductCategory, ProductCategoryControllerService, ProductControllerService, ProductItem} from "../../../api";
import {MatSelectChange} from "@angular/material/select";
import {DialogService} from "primeng/dynamicdialog";
import {MatDialog} from "@angular/material/dialog";
import {finalize, Observable, of, shareReplay, take} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService, ProductControllerService, ProductCategoryControllerService]
})
export class ProductComponent implements OnInit {

  @ViewChild("addProductModal") addProductModal: TemplateRef<any>;

  productList$: Observable<Array<ProductItem>> = of([]);
  categories$: Observable<Array<ProductCategory>> = of([]);
  selectedCategory: ProductCategory;
  maintainProductCategoryDropdownForm: FormGroup;
  loading: any;


  msgs: Message[] = [];
  position: string;


  constructor(private dialogService: MatDialog,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private productService: ProductControllerService,
              private categoryService: ProductCategoryControllerService) {
  }

  ngOnInit(): void {

    this.maintainProductCategoryDropdownForm = new FormGroup({
      "name": new FormControl(Validators.required)
    })

    this.categories$ = this.categoryService.getAllProductCategoriesUsingGET().pipe(
      shareReplay(),
      take(1),
      finalize(() => this.loading = false));

    this.categories$.subscribe(cat => {
      this.selectedCategory = cat[0];
    })

    this.productList$ = this.productService.getAllProductsUsingGET();
    this.productList$.subscribe()

  }

  editProduct(product: any) {
    this.productService.updateProductUsingPUT(product).subscribe();
  }

  deleteProduct(product: any) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true;
        setTimeout(() => {

          this.productService.deleteProductUsingDELETE(product.id).pipe(
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

  openNew() {
    this.dialogService.open(AddProductModalComponent, {
      width: '600px',
      data: {category: this.selectedCategory, openType: 'NEW'}
    })
    // dialogRef.afterClosed().subscribe(() => this.refreshTable())
  }

  onChange($event: MatSelectChange) {
    this.loading = true;
    this.categories$.subscribe(res => {
      this.selectedCategory = res.filter(category => category.id === $event.value)[0]
    });
    console.log("Selected Category: ", this.selectedCategory)
    this.productList$ = this.productService.getAllProductsByCategoryUsingPOST(this.selectedCategory).pipe(
      shareReplay(),
      take(1),
      finalize(() => this.loading = false)
    );
    this.productList$.subscribe(res => console.log(res));
  }

  private refreshTable() {
    this.loading = true;

    console.log("Reloading list");

    setTimeout(() => {
      this.productList$ = this.productService.getAllProductsByCategoryUsingPOST(this.selectedCategory).pipe(
        shareReplay(),
        take(1),
        finalize(() => this.loading = false)
      );

    }, 3000)

    this.productList$.subscribe();
  }

  onProductCreatedOrUpdated($event: any) {

    this.refreshTable();

  }

}
