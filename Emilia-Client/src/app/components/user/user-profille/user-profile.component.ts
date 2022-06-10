import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-profille',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: any;
  items: MenuItem[];
  activeIndex: number = 1;
  isEditMode: boolean = false;
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

  constructor(private tokenStorage: TokenStorageService,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.getImage();

    this.profileForm = new FormGroup({
      firstName: new FormControl(this.currentUser.userInfo.firstName || ''),
      lastName: new FormControl(this.currentUser.userInfo.lastName || ''),
      phoneNumber: new FormControl(this.currentUser.userInfo.phoneNumber || ''),
      email: new FormControl(this.currentUser.userInfo.email || ''),
      city: new FormControl(this.currentUser.userInfo.city || ''),
      address: new FormControl(this.currentUser.userInfo.address || ''),
    })

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
    console.log(this.tokenStorage.getUser().id + ' this id');
    this.http.get('http://localhost:8080/image/get/' + this.tokenStorage.getUser().id)
      .subscribe(
        res => {
          console.log(res);
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }, error => {
          console.log(error.error);
        }
      );
  }
}

