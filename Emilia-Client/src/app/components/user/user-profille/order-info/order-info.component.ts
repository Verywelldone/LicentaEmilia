import {Component, OnInit} from '@angular/core';
import {Order, OrderControllerService} from "../../../../api";
import {TokenStorageService} from "../../../../services/token-storage.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
  providers: [OrderControllerService, TokenStorageService]
})
export class OrderInfoComponent implements OnInit {

  constructor(private orderController: OrderControllerService, private tokenStorage: TokenStorageService) {
  }

  orderList: Observable<Array<Order>>
  orderListItems: Array<Order>;

  ngOnInit(): void {
    const userID = this.tokenStorage.getUser().id;
    this.orderList = this.orderController.getAllOrdersByCustomerIdUsingGET(userID);
    this.orderList.subscribe((res: Array<Order>) => {

      res.forEach(orderProduct => {
        orderProduct.orderProducts?.forEach(orderProduct => {
          // @ts-ignore
          Object.defineProperty(orderProduct, 'productItem', Object.getOwnPropertyDescriptor(orderProduct, 'product'));
          // @ts-ignore
          delete orderProduct['product'];
        })
      })
      this.orderListItems = res;
      console.log(this.orderListItems);
    })
  }

}
