import {Injectable} from '@angular/core';
import {Role} from "../api";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class RoleAuthorisationService {

  constructor(private tokenStorageService: TokenStorageService) {
  }

  public isAuthorised(roles: Role[]): boolean {
    const user = this.tokenStorageService.getUser();
    if (!user)
      return false;
    return roles.indexOf(user.roles) >= 0
  }
}
