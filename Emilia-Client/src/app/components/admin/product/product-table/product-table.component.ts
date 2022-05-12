import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../api";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  @Input() loading!: boolean;
  @Input() result!: Array<Product>

  constructor() {
  }

  ngOnInit(): void {
  }

  editProduct(product: any) {

  }

  deleteProduct(product: any) {

  }
}
