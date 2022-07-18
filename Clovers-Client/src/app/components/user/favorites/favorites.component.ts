import {Component, OnInit} from '@angular/core';
import { ProductCategory, ProductItem, UserControllerService} from "../../../api";
import {Observable} from "rxjs";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  providers: [UserControllerService]
})
export class FavoritesComponent implements OnInit {

  favoriteProductList: Observable<Array<ProductItem>>;

  constructor(private userService: UserControllerService) {
  }

  ngOnInit(): void {
    this.favoriteProductList = this.userService.getAllUserFavoriteProductsUsingGET();
    this.favoriteProductList.subscribe();
  }

}
