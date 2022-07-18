import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {
  ProductCategory,
  ProductCategoryControllerService,
  ProductControllerService,
  ProductItem
} from "../../../../api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar} from "@angular/material/snack-bar";
import {Observable, of, shareReplay, Subject, take} from "rxjs";
import {MatSelectChange} from "@angular/material/select";
import {Router} from "@angular/router";

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
  newProduct: ProductItem = {};
  addNewProductFormGroup: FormGroup;
  openType: string;
  categories$: Observable<Array<ProductCategory>> = of([]);
  @Output()
  productEventEmitter: EventEmitter<ProductItem> = new EventEmitter<ProductItem>();
  selectedCategory: ProductCategory;


  loading: boolean = false


  constructor(
    private productService: ProductControllerService,
    private categoryService: ProductCategoryControllerService,
    private snackBar: MatSnackBar, private router: Router) {
    this.categories$ = this.categoryService.getAllProductCategoriesUsingGET().pipe(
      shareReplay(),
      take(1),
    );
    this.categories$.subscribe(res=>console.log(res));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  ngOnInit(): void {
    this.addNewProductFormGroup = new FormGroup({
      "name": new FormControl("", Validators.required),
      "category": new FormControl("", Validators.required),
      "price": new FormControl("", Validators.required),
      "stock": new FormControl("", Validators.required),
      "weight": new FormControl("", Validators.required),
      "image": new FormControl("https://static9.depositphotos.com/1642482/1148/i/450/depositphotos_11489080-stock-photo-fresh-carrots.jpg", Validators.required),
      "description": new FormControl("", Validators.required)
    })


  }

  onSubmit() {
    this.loading = true;


    setTimeout(() => {
      this.addProduct();
      this.snackBar.open("Product has been saved", 'OK', {duration: 2000})
      this.loading = false;
      this.router.navigate(['/gestioner'])

    }, 2000)

  }


  addProduct() {
    this.newProduct = {
      name: this.addNewProductFormGroup.get('name')?.value,
      price: this.addNewProductFormGroup.get('price')?.value,
      stock: this.addNewProductFormGroup.get('stock')?.value,
      weight: this.addNewProductFormGroup.get('weight')?.value,
      image: this.addNewProductFormGroup.get('image')?.value,
      description: this.addNewProductFormGroup.get('description')?.value,
    }
    this.newProduct.productCategory = this.selectedCategory;

    this.productService.addProductUsingPOST(this.newProduct).subscribe(() => {


    });
  }


  onChange($event: MatSelectChange) {
    this.categories$.subscribe(res => {
      this.selectedCategory = res.filter(category => category.id === $event.value)[0]
    });
  }

}
