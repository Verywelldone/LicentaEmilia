import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductItem} from "../../../../api";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ProductTableComponent implements OnInit {

  @Input() loading!: boolean;
  @Input() result!: Array<ProductItem>
  @Output() productDeleted = new EventEmitter<ProductItem>()

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  editProduct(product: any) {

  }

  deleteProduct(product: ProductItem) {
    this.productDeleted.emit(product);
  }
}
