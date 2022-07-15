import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductCategory, ProductItem} from "../../../../api";

@Component({
  selector: 'app-maintain-categories-table',
  templateUrl: './maintain-categories-table.component.html',
  styleUrls: ['./maintain-categories-table.component.scss']
})
export class MaintainCategoriesTableComponent implements OnInit {

  @Input() loading!: boolean;
  @Input() result!: Array<ProductCategory>
  @Output() onCategoryDeleted = new EventEmitter<ProductCategory>()
  @Output() onCategoryEdited = new EventEmitter<ProductCategory>()


  constructor() {
  }

  ngOnInit(): void {
  }

  deleteCategory(product: any) {
    this.onCategoryDeleted.emit(product);
  }

  onRowEditInit(product: any) {

  }

  onRowEditSave(product: any) {
    this.onCategoryEdited.emit(product);
  }

  onRowEditCancel(product: any, ri: any) {

  }
}
