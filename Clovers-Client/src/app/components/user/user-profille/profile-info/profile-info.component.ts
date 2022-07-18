import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TokenStorageService} from "../../../../services/token-storage.service";
import {UpdateUserInfoDto, UserControllerService} from "../../../../api";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {


  currentUser: any;

  items: MenuItem[];
  activeIndex: number = 1;
  isEditMode: boolean = true;

  // IMAGE VARIABLES
  selectedFile: File;
  message: string;
  public imagePath: any;
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  changeimg = false;


  profileForm: FormGroup;
  hideImage: boolean = false;

  constructor(private tokenStorage: TokenStorageService,
              private userInfoService: UserControllerService,
              private http: HttpClient,
              private fb: FormBuilder,
              private router: Router) {


    this.profileForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
    });

  }

  ngOnInit(): void {
    this.userInfoService.getLoggedInUserInfoUsingGET().subscribe(res => {
      this.currentUser = res

      this.profileForm.reset({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        phoneNumber: this.currentUser.phoneNumber,
        email: this.currentUser.email,
        city: this.currentUser.city,
        address: this.currentUser.address
      })
      this.getImage();
    });
  }

  updateUserInfo() {
    this.isEditMode = !this.isEditMode;
    let userInfo: UpdateUserInfoDto = {
      address: this.profileForm.controls['address'].value,
      city: this.profileForm.controls['city'].value,
      email: this.profileForm.controls['email'].value,
      firstName: this.profileForm.controls['firstName'].value,
      lastName: this.profileForm.controls['lastName'].value,
      phoneNumber: this.profileForm.controls['phoneNumber'].value
    }

    this.userInfoService.updateUserInfoUsingPUT(userInfo).subscribe();
  }

  onUpload() {
    // console.log(this.selectedFile);
    const userID = this.tokenStorage.getUser().id;
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('userId', userID);
    this.http.post('http://localhost:8080/image/upload', uploadImageData, {observe: 'response'})
      .subscribe((response) => {
          window.location.reload();

          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        }
      );
  }


  public onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    // this.onUpload();
  }


  preview(files: any) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  changeImage() {
    this.changeimg = !this.changeImage;
  }


  changeEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  private getImage() {
    this.http.get('http://localhost:8080/image/get/' + this.tokenStorage.getUser().id)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }, error => {
          console.log(error.error);
        }
      );

    if (this.base64Data === null || this.base64Data == undefined) {
      this.hideImage = true;
    } else {
      this.hideImage = false;
    }

    console.log(this.hideImage)
  }

}
