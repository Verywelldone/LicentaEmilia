import {Component, Input, OnInit} from '@angular/core';
import {OrderControllerService, OrderRes} from "../../../api";
import {finalize, map, Observable, shareReplay, take} from "rxjs";
import {MessageService} from "primeng/api";
import OrderStatusEnum = OrderRes.OrderStatusEnum;

@Component({
  selector: 'app-filtered-orders',
  templateUrl: './filtered-orders.component.html',
  styleUrls: ['./filtered-orders.component.scss'],
  providers: [OrderControllerService, MessageService]
})
export class FilteredOrdersComponent implements OnInit {
  orders$: Observable<Array<OrderRes>>;
  loading: boolean;
  @Input() orderStatusSelected: OrderStatusEnum;

  constructor(private orderService: OrderControllerService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.initData();
  }

  reloadData(orderStatus: OrderStatusEnum) {

    this.initData();
    this.showMessage(orderStatus);

  }

  initData() {
    this.loading = true;
    this.orders$ = this.orderService.getAllOrdersUsingGET().pipe(
      map(res => {
        console.log(res);
        res.forEach(orderProduct => {
          orderProduct.orderProducts?.forEach(orderProduct => {
            // @ts-ignore
            Object.defineProperty(orderProduct, 'productItem', Object.getOwnPropertyDescriptor(orderProduct, 'product'));
            // @ts-ignore
            delete orderProduct['product'];
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
    this.orders$.subscribe();
  }


  showMessage(orderStatusEnum: OrderStatusEnum) {
    console.log(orderStatusEnum)
    switch (orderStatusEnum) {
      case "CANCELED":
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Success',
          detail: 'This order has been canceled'
        });
        break;
      case "DELIVERED":
        this.messageService.add({
          key: 'bc',
          severity: 'info',
          summary: 'Success',
          detail: 'This order has been delivered'
        });
        break;
      case "PENDING":
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Success',
          detail: 'This order has been accepted'
        });
        break;
      case "SENT": {
        console.log("Case SENT")
        this.messageService.add({key: 'bc', severity: 'info', summary: 'Success', detail: 'This order has been sent'});
        break;
      }

    }
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
}
