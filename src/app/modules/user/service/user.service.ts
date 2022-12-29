import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseAPI = environment.baseAPI

  constructor(
    private _http: HttpClient
  ) { }


  //get user
  get_user_list = `${this.baseAPI}customers`
  getUsersList(): Observable<any> {
    return this._http.get(this.get_user_list);
  }

  //add user
  create_user = `${this.baseAPI}customers`
  addUser(body): Observable<any> {
    return this._http.post(this.create_user, body);
  }
}
