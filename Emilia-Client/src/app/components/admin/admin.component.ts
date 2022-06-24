import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AdminControllerService, MaintainUserDTO, User} from "../../api";
import {UserService} from "../../services/user.service";
import {finalize, Observable, take} from "rxjs";
import {MessageService} from "primeng/api";

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
  providers: [AdminControllerService, UserService, MessageService]
})
export class AdminComponent implements OnInit {

  users$: Observable<MaintainUserDTO[]>;
  loading: boolean;

  constructor(private adminService: AdminControllerService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.reloadUserList()
  }

  reloadUserList() {
    this.loading = true;
    this.users$ = this.adminService.getUserListUsingGET().pipe(
      take(1), finalize(() => this.loading = false));

    this.users$.subscribe(res => console.log(res));
  }


  disableAccount(id: any) {
    this.adminService.disableAccountUsingPOST(id).subscribe(() => {
      this.messageService.add({
        key: 'tc',
        severity: 'warn',
        summary: 'Success!',
        detail: 'User account has been banned!'
      });
    });

    this.loading = true;
    setTimeout(() => {
      this.reloadUserList();
      this.loading = false;
    }, 1500)
  }

  enableAccount(id: any) {
    this.adminService.enableAccountUsingPOST(id).subscribe(() => this.messageService.add({
        key: 'tc',
        severity: 'success',
        summary: 'Success!',
        detail: 'User account has been enabled!'
      })
    );
    this.loading = true;

    setTimeout(() => {
      this.reloadUserList();
      this.loading = false;

    }, 1000)
  }
}
