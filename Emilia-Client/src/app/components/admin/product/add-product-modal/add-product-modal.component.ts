import {Component, EventEmitter, Inject, OnDestroy, OnInit, Output} from '@angular/core';
import {Product, ProductCategoryControllerService, ProductControllerService} from "../../../../api";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar} from "@angular/material/snack-bar";
import {Subject} from "rxjs";

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
  providers: [ProductControllerService, ProductCategoryControllerService, {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {duration: 2500}
  }]
})
export class AddProductModalComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject()
  newProduct: Product = {};
  addNewProductFormGroup: any;
  openType: string;

  @Output()
  productEventEmitter: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductControllerService,
              public dialogRef: MatDialogRef<any>, private snackBar: MatSnackBar) {
    this.openType = data.openType;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  ngOnInit(): void {
    this.addNewProductFormGroup = new FormGroup({
      "name": new FormControl("" || this.data.product.name, Validators.required),
      "category": new FormControl("" || this.data.category.name, Validators.required),
      "price": new FormControl("" || this.data.product.price, Validators.required),
      "stock": new FormControl("" || this.data.product.stock, Validators.required),
      "weight": new FormControl("" || this.data.product.weight, Validators.required),
      "description": new FormControl("" || this.data.product.description, Validators.required)
    })
  }

  onSubmit() {
    this.newProduct = {
      name: this.addNewProductFormGroup.get('name')?.value,
      price: this.addNewProductFormGroup.get('price')?.value,
      stock: this.addNewProductFormGroup.get('stock')?.value,
      weight: this.addNewProductFormGroup.get('weight')?.value,
      description: this.addNewProductFormGroup.get('description')?.value,
    }
    this.newProduct.productCategory = this.data.category;

    this.productService.addProductUsingPOST(this.newProduct).subscribe(() => this.snackBar.open("Product has been saved", 'OK', {duration: 2000}));

    this.dialogRef.close();
  }

}
