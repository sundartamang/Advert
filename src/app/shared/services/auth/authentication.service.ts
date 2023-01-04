import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs'
import { EncryptDecryptService } from '../encrypptDecrypt/encrypt-decrypt.service';
import { ShowMessageService } from '../showMessage/show-message.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { User } from 'src/app/modules/user/models/userModal';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<User>
  public currentUserSubject: BehaviorSubject<User>
  tokenSubscription = new Subscription()
  baseAPI = environment.baseAPI
  login_api_url = `${this.baseAPI}login`


  constructor(
    private _http: HttpClient,
    private _encryptDecrypt: EncryptDecryptService,
    private _router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()

  }


  // getter: currentUserValue
  public get currentUserValue() {
    return this.currentUserSubject.value
  }


  // getter aaccesstoken
  public get getAccessToken() {
    const accessToken = this._encryptDecrypt.decryptToken();
    return accessToken
  }


  // is loggged in
  get isLoggedIn() {
    if(localStorage.getItem('currentUser')){
      return true
    }else{
      return false
    }
  }

  login(data){
    let username = data.username;
    let password = data.password;
    let app = data.app
    return this._http
      .post<any>(this.login_api_url, { username, password, app }).pipe(
        map(user => {
          // when user credential is not match
          if (user['statusCode'] == "403") {
            // this._showMessage.toastWarning(user['message'])
          } else {
            if (user && user['jsonWebToken']) {

              this._encryptDecrypt.encryptToken(user)
              // notify
              this.currentUserSubject.next(user)
            }
          }

          return user
        })
      )
  }

  // login(data){
  //   let username = data.username;
  //   let password = data.password;
  //   let app = data.app

  //   return this._http.post<any>(this.login_api_url, {username, password, app})
  // }


  // logout
  logout() {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('userRouteList')
    // notify
    this.currentUserSubject.next(null)
  }


}