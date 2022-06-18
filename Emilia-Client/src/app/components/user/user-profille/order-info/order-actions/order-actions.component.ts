import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order, OrderControllerService} from "../../../../../api";


@Component({
  selector: 'app-order-actions',
  templateUrl: './order-actions.component.html',
  styleUrls: ['./order-actions.component.scss'],
  providers: [OrderControllerService]
})
export class OrderActionsComponent implements OnInit {

  @Input() order: Order;
  @Output() onOrderCanceled = new EventEmitter<any>();

  constructor(private orderService: OrderControllerService) {
  }

  ngOnInit(): void {
    console.log(this.order)
  }

  cancelOrder() {
    this.orderService.cancelOrderUsingPUT(this.order).subscribe((res: string) => console.log(res));
    this.onOrderCanceled.emit();
  }
}
