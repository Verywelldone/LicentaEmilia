import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order, OrderControllerService, OrderRes} from "../../../../../api";
import OrderStatusEnum = OrderRes.OrderStatusEnum;


@Component({
  selector: 'app-order-actions',
  templateUrl: './order-actions.component.html',
  styleUrls: ['./order-actions.component.scss'],
  providers: [OrderControllerService]
})
export class OrderActionsComponent implements OnInit {

  @Input() order: Order;
  @Input() isManager: boolean;
  @Output() onOrderEventEmitted = new EventEmitter<any>();
  @Output() onManagerEventEmitted = new EventEmitter<OrderStatusEnum>();

  constructor(private orderService: OrderControllerService) {
  }

  ngOnInit(): void {
  }

  cancelOrder() {
    this.orderService.cancelOrderUsingPUT(this.order).subscribe();
    this.onOrderEventEmitted.emit(OrderStatusEnum.CANCELED);
  }

  sendOrder() {
    this.orderService.acceptOrderUsingPUT(this.order).subscribe();
    this.onManagerEventEmitted.emit(OrderStatusEnum.SENT);
  }

  deliverOrder() {
    this.orderService.deliverOrderUsingPUT(this.order).subscribe();
    this.onManagerEventEmitted.emit(OrderStatusEnum.DELIVERED);
  }


}
