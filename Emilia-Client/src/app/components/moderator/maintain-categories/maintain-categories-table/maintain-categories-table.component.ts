import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductCategory} from "../../../../api";

@Component({
  selector: 'app-maintain-categories-table',
  templateUrl: './maintain-categories-table.component.html',
  styleUrls: ['./maintain-categories-table.component.scss']
})
export class MaintainCategoriesTableComponent implements OnInit {

  @Input() loading!: boolean;
  @Input() result!: Array<ProductCategory>
  @Output() categoryEventEmitter = new EventEmitter<ProductCategory>()

  constructor() {
  }

  ngOnInit(): void {
  }

  editCategory(product: any) {

  }

  deleteProduct(product: any) {

  }
}
