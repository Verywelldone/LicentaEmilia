import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UpdateUserInfoDto, UserControllerService} from 'src/app/api';

@Component({
  selector: 'app-user-profille',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserControllerService]
})
export class UserProfileComponent {


}

