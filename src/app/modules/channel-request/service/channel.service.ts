import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
    private _http: HttpClient
  ) { }

  //update adver
  get_advert = 'http://localhost:3000/advert'
  getAdvertDetail(id): Observable<any> {
    return this._http.get(`${this.get_advert}/${id}`);
  }

  //add advert
  get_channel = 'http://localhost:3000/channel'
  getChannel(): Observable<any> {
    return this._http.get(this.get_channel);
  }

  //add advert
  create_channel = 'http://localhost:3000/channel'
  addChannel(body): Observable<any> {
    return this._http.post(this.create_channel, body);
  }

}
