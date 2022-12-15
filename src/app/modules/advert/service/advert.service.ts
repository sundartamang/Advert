import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(
    private _http: HttpClient
  ) { }

  //add advert
  get_advert = 'http://localhost:3000/advert'
  getAdvert(): Observable<any> {
    return this._http.get(this.get_advert);
  }

  //add advert
  create_advert = 'http://localhost:3000/advert'
  addAdvert(body): Observable<any> {
    return this._http.post(this.create_advert, body);
  }

  //update adver
  update_advert = 'url'
  updateAdvert(body): Observable<any> {
    return this._http.put(this.update_advert, body);
  }




}
