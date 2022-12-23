import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
