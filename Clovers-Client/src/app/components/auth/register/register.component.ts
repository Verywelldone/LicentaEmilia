import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  showDetails: boolean = true;
  userAccountFormGroup: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
    password: new FormControl("", Validators.compose([Validators.required, Validators.min(6), Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$')]))
  });

  userDetailsFormGroup: FormGroup = new FormGroup({
    fname: new FormControl("", Validators.required),
    lname: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required)
  });
  pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
  }

  onSubmit() {

    this.form = {
      username: this.userAccountFormGroup.controls['username'].value,
      email: this.userAccountFormGroup.controls['email'].value,
      password: this.userAccountFormGroup.controls['password'].value,
      userInfo: {
        address: this.userDetailsFormGroup.controls['address'].value,
        city: this.userDetailsFormGroup.controls['city'].value,
        firstName: this.userDetailsFormGroup.controls['fname'].value,
        lastName: this.userDetailsFormGroup.controls['lname'].value,
        email: this.userAccountFormGroup.controls['email'].value,
        phoneNumber: this.userDetailsFormGroup.controls['phone'].value,
      },

    }
    console.log(this.form)
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['login']).then(r => this.router.navigate(['login']));
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }
}
