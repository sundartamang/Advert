import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { ShowMessageService } from 'src/app/shared/services/showMessage/show-message.service';
import { Auth } from '../models/authModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  authDetail: Auth;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthenticationService,
    private _showMessage: ShowMessageService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (this._authService.isLoggedIn) {
      this._router.navigate(['dashboard/channel'])
    }


    this.buildAuthForm();
  }

  // form builder
  buildAuthForm() {
    const auth = this.authDetail;
    this.authForm = this._fb.group({
      username: [
        auth ? auth.username : "",
        [Validators.required]
      ],
      password: [
        auth ? auth.password : "",
        [Validators.required]
      ],
      app: [
        auth ? auth.app : "advert",
      ],
    });

  }

  // on submit 
  onSubmit() {
    // const username = this.authForm.get('username').value
    // const password = this.authForm.get('password').value
    // const app = this.authForm.get('app').value

    this._authService.login(this.authForm.value).subscribe((res)=>{
      console.log("RESPONSE AFTER LOGIN ", res)

      if(res){
        this._router.navigate(['dashboard/channel'])
        const msg = "Successfully logged in!"
        this._showMessage.toastSuccess(msg)

      }
    })

  }
}
