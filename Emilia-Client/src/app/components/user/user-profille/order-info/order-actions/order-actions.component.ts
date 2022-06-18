import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../../../api";

@Component({
  selector: 'app-order-actions',
  templateUrl: './order-actions.component.html',
  styleUrls: ['./order-actions.component.scss']
})
export class OrderActionsComponent implements OnInit {

  @Input() order: Order;

  constructor() {
  }

  ngOnInit(): void {
  }

}
