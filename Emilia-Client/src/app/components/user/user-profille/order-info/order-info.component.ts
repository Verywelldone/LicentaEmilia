import {Component, OnInit} from '@angular/core';
import {Order, OrderControllerService, OrderProductRes} from "../../../../api";
import {TokenStorageService} from "../../../../services/token-storage.service";
import {finalize, map, Observable, shareReplay, take} from "rxjs";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
  providers: [OrderControllerService, TokenStorageService]
})
export class OrderInfoComponent implements OnInit {

  constructor(private orderController: OrderControllerService, private tokenStorage: TokenStorageService) {
  }

  orderList$: Observable<Array<Order>>
  loading: boolean = false

  ngOnInit(): void {
    this.loadOrders();
  }

  reloadOrders() {
    console.log("Reloading list");
    this.loading = true;
    setTimeout(() => {
      this.loadOrders();
      this.loading = false;
    }, 2000)

  }

  private loadOrders() {
    const userID = this.tokenStorage.getUser().id;
    this.loading = true;
    this.orderList$ = this.orderController.getAllOrdersByCustomerIdUsingGET(userID).pipe(
      map(res => {
        res.forEach(orderProduct => {
          orderProduct.orderProducts?.forEach((orderProduct: OrderProductRes) => {
            console.log(orderProduct);
            // @ts-ignore
            Object.defineProperty(orderProduct, 'productItem', Object.getOwnPropertyDescriptor(orderProduct, 'product'));
            // @ts-ignore
            delete orderProduct['productItem'];
          })
        })
        return res;
      }),
      shareReplay(),
      take(1),
      finalize(() => this.loading = false)
    );

    this.orderList$.subscribe()

  }


}
