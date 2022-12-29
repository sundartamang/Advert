import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  baseAPI = environment.baseAPI

  constructor(
    private _http: HttpClient
  ) { }

  //add advert
  get_advert = `${this.baseAPI}adverts`
  getAdvert(): Observable<any> {
    return this._http.get(this.get_advert);
  }

  //add advert
  create_advert = `${this.baseAPI}adverts`
  addAdvert(body): Observable<any> {
    return this._http.post(this.create_advert, body);
  }

  //update adver
  update_advert = 'url'
  updateAdvert(body): Observable<any> {
    return this._http.put(this.update_advert, body);
  }




}
