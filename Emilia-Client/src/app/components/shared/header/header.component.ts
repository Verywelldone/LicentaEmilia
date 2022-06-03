import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {Observable, of, shareReplay, take} from "rxjs";
import {ProductCategory, ProductCategoryControllerService} from "../../../api";
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
  username: string;
  value3: 'Search';
  display: boolean;
  private roles: string[];
  itemsInCart: string;

  categories$: Observable<Array<ProductCategory>> = of([]);

  constructor(private categoryService: ProductCategoryControllerService, private tokenStorageService: TokenStorageService, private cartService: CartService) {
    this.roles = [];
    this.username = '';
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.getProductCategories()

      this.cartService.cartItems.subscribe(d => {
        this.itemsInCart = d!.length.toString();
      })

      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  getProductCategories() {
    this.categories$ = this.categoryService.getAllProductCategoriesUsingGET().pipe(
      shareReplay(),
      take(1),
    );
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
