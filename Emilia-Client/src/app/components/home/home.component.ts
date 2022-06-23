import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ProductControllerService} from "../../api";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ProductControllerService]
})
export class HomeComponent implements OnInit {
  content: string | undefined;

  // products$: Observable<Array<Product>>;
  productList: any = [];

  constructor(private userService: UserService, private productService: ProductControllerService) {
  }

  ngOnInit() {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    /*    this.products$ = this.productService.getRandomProductsUsingGET();
        // @ts-ignore
        this.products$.subscribe(res => this.productList = res);*/

  }

  // onAddToCart($event: String) {
  //   console.log("AddToCart", $event)
  // }
}
