import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }


  //get user
  get_user_list = 'http://localhost:3000/user'
  getUsers(): Observable<any> {
    return this._http.get(this.get_user_list);
  }

  //add user
  create_user = 'http://localhost:3000/user'
  addUser(body): Observable<any> {
    return this._http.post(this.create_user, body);
  }
}
