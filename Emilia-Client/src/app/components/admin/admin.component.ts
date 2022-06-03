import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatPaginator} from "@angular/material/paginator";
import {AdminControllerService} from "../../api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [AdminControllerService, UserService]
})
export class AdminComponent implements OnInit {

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private adminService: AdminControllerService,
    private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  isAdmin: boolean;
  expandedElement: any;
  dataSource: any;
  content: '';
  displayedColumns = ['id', 'username', 'email', 'role'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  // @ts-ignore
  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data
      },
      error => {
        window.location.href = 'home'
      }
    )

    this.loadUserList();
  }


  disableAccount(id: any) {
    this.adminService.disableAccountUsingPOST(id).subscribe(response => {
      this.snackBar.open(response, 'OK', {
        duration: 4000,
      });
      this.loadUserList();
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.text, 'OK', {
        duration: 4000,
      });
    });

    this.loadUserList();
  }

  enableAccount(id: any) {
    this.adminService.enableAccountUsingPOST(id).subscribe(response => {
      this.snackBar.open(response, 'OK', {
        duration: 4000,
      });
      this.loadUserList();
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.text, 'OK', {
        duration: 4000,
      });
    });
    this.loadUserList();
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

  loadUserList() {
    this.adminService.getUserListUsingGET().subscribe(list => {

      // tslint:disable-next-line:only-arrow-functions
      list = list.filter(function (obj) {
        // tslint:disable-next-line:only-arrow-functions
        // @ts-ignore
        return obj.roles.filter(function (role) {
          return role.name !== 'ROLE_USER';
        });
      });

      console.log(list);
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.changeDetectorRefs.detectChanges();
    });
  }
}
