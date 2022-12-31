import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GoBackService {

  constructor(
    private _location : Location
  ) { }

  previousPage(){
    this._location.back();
  }
}

