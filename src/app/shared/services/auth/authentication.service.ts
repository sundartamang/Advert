import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs'
import { EncryptDecryptService } from '../encrypptDecrypt/encrypt-decrypt.service';
import { ShowMessageService } from '../showMessage/show-message.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<any>
  public currentUserSubject: BehaviorSubject<any>
  tokenSubscription = new Subscription()
  baseAPI = environment.baseAPI
  login_api_url = `${this.baseAPI}login`


  constructor(
    private _http: HttpClient,
    private _encryptDecrypt: EncryptDecryptService,
    private _router: Router,
    private _showMessage: ShowMessageService,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()

  }


  // getter: currentUserValue
  public get currentUserValue() {
    return this.currentUserSubject.value
  }


  // getter aaccesstoken
  public get getAccessToken() {
    const accessToken = this._encryptDecrypt.decryptToken();

    if (accessToken != null) {
      return accessToken['accesstoken']
    }
  }





  // is loggged in
  get isLoggedIn() {
    return localStorage.getItem('currentUser')
  }



  login(username: string, password: string) {
    return this._http
      .post<any>(this.login_api_url, { username, password }).pipe(
        map(user => {
          // when user credential is not match
          if (user['statusCode'] == "403") {
            this._showMessage.toastWarning(user['message'])
          } else {
            if (user && user.data.accesstoken) {
              console.warn("This is response after login.........................", user)

              this._encryptDecrypt.encryptToken(user)
              // notify
              this.currentUserSubject.next(user)
            }
          }

          return user
        })
      )
  }


  // logout
  logout() {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('userRouteList')
    // notify
    this.currentUserSubject.next(null)
  }


}
