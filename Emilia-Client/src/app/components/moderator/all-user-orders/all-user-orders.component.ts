import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserService} from "../../../services/user.service";
import {AdminControllerService, OrderControllerService, User} from "../../../api";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-all-user-orders',
  templateUrl: './all-user-orders.component.html',
  styleUrls: ['./all-user-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [[AdminControllerService, UserService, OrderControllerService]]
})
export class AllUserOrdersComponent implements OnInit {
  list2: any[];
  loading: boolean = false
  expandedElement: any;
  dataSource: any;
  content: '';
  displayedColumns = ['id', 'username', 'email'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private tokenStorageService: TokenStorageService,
              private userService: UserService,
              private adminService: AdminControllerService,
              private changeDetectorRefs: ChangeDetectorRef,
              orderService: OrderControllerService) {
  }

  // @ts-ignore
  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loadUserList();
      this.loading = false;
    }, 2000)
  }


  loadUserList() {
    /**
     *
     *       map(res => {
        res.forEach(orderProduct => {
          orderProduct.orderProducts?.forEach(orderProduct => {
            // @ts-ignore
            Object.defineProperty(orderProduct, 'productItem', Object.getOwnPropertyDescriptor(orderProduct, 'product'));
            // @ts-ignore
            delete orderProduct['product'];
          })
        })
        return res;
      })

     */


    this.adminService.getUserListUsingGET().subscribe((list: User[]) => {

      let filteredList: any[] | undefined = [];

      list.forEach(user => {
        // @ts-ignore
        if (user.orderList?.length > 0) {
          user.orderList?.forEach(orderProduct => {
            orderProduct.orderProducts?.forEach(orderProduct => {
              // @ts-ignore
              Object.defineProperty(orderProduct, 'productItem', Object.getOwnPropertyDescriptor(orderProduct, 'product'));
              // @ts-ignore
              delete orderProduct['product'];
            })
          })
          // @ts-ignore
          filteredList.push(user);
        }
      })

      this.list2 = filteredList;
      console.log(this.list2)
      this.dataSource = new MatTableDataSource(filteredList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.changeDetectorRefs.detectChanges();
    });
  }

  applyFilter(filterValue: KeyboardEvent) {
    // @ts-ignore
    console.log(filterValue.target.value)
    // @ts-ignore
    filterValue = filterValue.target.value
    // @ts-ignore
    filterValue = filterValue.trim(); // Remove whitespace
    // @ts-ignore
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
