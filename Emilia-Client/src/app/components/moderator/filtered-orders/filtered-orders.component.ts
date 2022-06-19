import {Component, Input, OnInit} from '@angular/core';
import {OrderControllerService, OrderRes} from "../../../api";
import {finalize, map, Observable, shareReplay, take} from "rxjs";
import OrderStatusEnum = OrderRes.OrderStatusEnum;

@Component({
  selector: 'app-filtered-orders',
  templateUrl: './filtered-orders.component.html',
  styleUrls: ['./filtered-orders.component.scss'],
  providers: [OrderControllerService]
})
export class FilteredOrdersComponent implements OnInit {
  orders$: Observable<Array<OrderRes>>;
  loading: boolean;
  @Input() orderStatusSelected: OrderStatusEnum;

  constructor(private orderService: OrderControllerService) {
  }

  ngOnInit(): void {

    this.orders$ = this.orderService.getAllOrdersUsingGET().pipe(
      map(res => {
        console.log(res);
        res.forEach(orderProduct => {
          orderProduct.orderProducts?.forEach(orderProduct => {
            console.log(orderProduct, "Before");

            // @ts-ignore
            Object.defineProperty(orderProduct, 'productItem', Object.getOwnPropertyDescriptor(orderProduct, 'product'));
            // @ts-ignore
            delete orderProduct['product'];
            console.log(orderProduct, "after");


          })
        })
        return res;
      }),
      map(res => {
        res = res.filter(order => order.orderStatus == this.orderStatusSelected);
        return res;
      }),
      shareReplay(),
      take(1),
      finalize(() => this.loading = false));

  }

}
