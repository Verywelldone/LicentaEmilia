import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {Observable, of, shareReplay, take} from "rxjs";
import {ProductCategory, ProductCategoryControllerService, ProductItem} from "../../../api";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ProductCategoryControllerService]
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showGestionerBoard = false;
  username: string;
  value3: 'Search';
  display: boolean;
  private roles: string[];
  itemsInCart: string;

  categories$: Observable<Array<ProductCategory>> = of([]);
  allProducts: ProductItem[] = [];

  countries: any[] = [];
  filteredCountries: any[] = [];
  selectedCountries: any[] = [];
  selectedCountry: any;


  constructor(private categoryService: ProductCategoryControllerService, private tokenStorageService: TokenStorageService, private cartService: CartService) {
    this.roles = [];
    this.username = '';
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.getProductCategories();

    if (this.isLoggedIn) {
      this.cartService.cartItems.subscribe(d => {
        this.itemsInCart = d!.length.toString();
      })

      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showGestionerBoard = this.roles.includes("ROLE_GESTIONER")
      this.username = user.username;
    }
  }

  getProductCategories() {
    this.categories$ = this.categoryService.getAllProductCategoriesUsingGET().pipe(
      shareReplay(),
      take(1),
    );

    this.categories$.subscribe(res => {
      res.forEach(category => {
        this.countries = this.countries.concat(category.productItems);
        console.log(this.countries);
      })
    })
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


  filterCountry(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  printItem($event: any) {
    console.log("intra aici")
  }

  redirectToProduct(product: any) {
    window.location.href = "home/product/" + product.id;

  }
}
