import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  title = 'advert';

  btnActiveName: string = 'channel';
  constructor(
    private _router : Router,
    private _authService : AuthenticationService
  ){}

  ngOnInit() {
  }

  activeBtn(btnName: string) {
    this.btnActiveName = btnName;

    if(btnName == 'customer'){
      this._router.navigate(['dashboard/customer'])
    }else{
      this._router.navigate(['dashboard/channel'])
    }
  }

  logout(){
    this._authService.logout();
    this._router.navigate(['/'])
  }

}
