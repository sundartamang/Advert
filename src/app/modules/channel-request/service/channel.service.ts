import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Channel, ChannelRootModel } from '../models/channelModal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  baseAPI = environment.baseAPI

  constructor(
    private _http: HttpClient
  ) { }

  //get channel
  get_channel = `${this.baseAPI}channels`
  getChannelList(): Observable<any> {
    return this._http.get<any>(this.get_channel);
  }

  //create advert
  create_channel = `${this.baseAPI}channels`
  addChannel(getBody): Observable<any> {
    return this._http.post<any>(this.create_channel, getBody);
  }

}
