import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {AddProductModalComponent} from "./add-product-modal/add-product-modal.component";
import {Product, ProductCategory, ProductCategoryControllerService, ProductControllerService} from "../../../api";
import {MatSelectChange} from "@angular/material/select";
import {DialogService} from "primeng/dynamicdialog";
import {MatDialog} from "@angular/material/dialog";
import {BehaviorSubject, finalize, Observable, of, shareReplay, take} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService, ProductControllerService, ProductCategoryControllerService]
})
export class ProductComponent implements OnInit {

  @ViewChild("addProductModal") addProductModal: TemplateRef<any>;

  productList$: Observable<Array<Product>> = of([]);
  categories$: Observable<Array<ProductCategory>> = of([]);
  selectedCategory: ProductCategory;
  loading$ = new BehaviorSubject<boolean>(false);
  maintainProductCategoryDropdownForm: FormGroup;


  constructor(private dialogService: MatDialog, private messageService: MessageService,
              private confirmationService: ConfirmationService, private productService: ProductControllerService, private categoryService: ProductCategoryControllerService) {
  }

  ngOnInit(): void {

    this.maintainProductCategoryDropdownForm = new FormGroup({
      "name": new FormControl(Validators.required)
    })

    this.categories$ = this.categoryService.getAllProductCategoriesUsingGET().pipe(
      shareReplay(),
      take(1),
      finalize(() => this.loading$.next(false)),
    );

    this.categories$.subscribe(cat => {
      this.selectedCategory = cat[0];
    })

    console.log(this.selectedCategory)
    this.productList$ = this.productService.getAllProductsUsingGET();
    this.productList$.subscribe()


    // this.refreshTable();
  }

  editProduct(product: any) {
    this.dialogService.open(AddProductModalComponent, {
      width: '600px',
      data: {category: this.selectedCategory, product: product, openType: 'EDIT'}
    })
  }

  deleteProduct(product: any) {
    this.productService.deleteProductUsingDELETE(product.id).subscribe(() => this.refreshTable());
  }

  openNew() {
    const dialogRef = this.dialogService.open(AddProductModalComponent, {
      width: '600px',
      data: {category: this.selectedCategory, product: {}, openType: 'NEW'}
    })

    dialogRef.afterClosed().subscribe(() => this.refreshTable())
  }

  onChange($event: MatSelectChange) {
    this.loading$.next(true);
    this.categories$.subscribe(res => {
      this.selectedCategory = res.filter(category => category.id === $event.value)[0]
    });
    console.log("Selected Category: ", this.selectedCategory)
    this.productList$ = this.productService.getAllProductsByCategoryUsingPOST(this.selectedCategory).pipe(
      shareReplay(),
      take(1),
      finalize(() => this.loading$.next(false))
    );
    this.productList$.subscribe(res => console.log(res));
  }

  private refreshTable() {
    this.loading$.next(true);
    this.productList$ = this.productService.getAllProductsByCategoryUsingPOST(this.selectedCategory).pipe(
      shareReplay(),
      take(1),
      finalize(() => this.loading$.next(false))
    );
    this.productList$.subscribe();
  }

  onProductCreatedOrUpdated($event: any) {

    console.log("EVENTUL ASTA", $event);

    console.log("INTRA IAICII")
    this.refreshTable();

  }

}
