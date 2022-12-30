import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  title = 'advert';

  btnActiveName: string = 'home';
  constructor(
    private _router : Router
  ){}

  ngOnInit() {
  }

  activeBtn(btnName: string) {
    this.btnActiveName = btnName;

    if(btnName == 'user'){
      this._router.navigate(['/user'])
    }else{
      this._router.navigate(['/'])
    }
  }

}
