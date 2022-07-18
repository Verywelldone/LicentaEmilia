import {Component, OnInit} from '@angular/core';
import {OrderRes} from "../../api";
import OrderStatusEnum = OrderRes.OrderStatusEnum;

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.scss'],

})
export class ModeratorComponent implements OnInit {
  orderStatusEnum: OrderStatusEnum;

  ngOnInit(): void {
  }

}
