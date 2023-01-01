import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { EncryptDecryptService } from '../../services/encrypptDecrypt/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private _router: Router,
    private _encryptService : EncryptDecryptService
) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const current_user = this._encryptService.decryptToken()

    if(current_user){
      return true
    }else{
      this._router.navigate(['not-authorized'])
      return false
    }
  }
  
}
