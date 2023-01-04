import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
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

  //get advert list
  get_advert = `${this.baseAPI}adverts/`
  getAdvert(adverts): Observable<any> {
    let channel_id = adverts.adverts.channelId
    // const params = new HttpParams().set('channelId', channel_id);
    // const headers = new HttpHeaders().set("X-CustomHeader", channel_id);


    return this._http.get(`${this.get_advert}channelId=${channel_id}`);
  }

  //add advert
  create_advert = `${this.baseAPI}adverts`
  addAdvert(body): Observable<any> {
    return this._http.post(this.create_advert, body);
  }

  // get customer list
  get_user_list = `${this.baseAPI}customers`
  getUsersList(): Observable<any> {
    return this._http.get(this.get_user_list);
  }

  //update adver
  // get_advet_data = 'url'
  // updateAdvert(body): Observable<any> {
  //   return this._http.put(this.update_advert, body);
  // }




}
