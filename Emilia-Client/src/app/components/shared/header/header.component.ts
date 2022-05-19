import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  value3: 'Search';
  display: boolean;
  private roles: string[];

  constructor(private tokenStorageService: TokenStorageService) {
    this.roles = [];
    this.username = '';
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
