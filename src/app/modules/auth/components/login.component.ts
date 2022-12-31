import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
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
  ) { }

  ngOnInit() {
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
        auth ? auth.app : "app",
      ],
    });

  }

  // on submit 
  onSubmit(){
    console.log("***************", this.authForm.value)
  }

}
