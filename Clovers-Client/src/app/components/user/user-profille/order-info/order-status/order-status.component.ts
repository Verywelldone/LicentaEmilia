import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  @Input() status:any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
