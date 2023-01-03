import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { catchError, retry } from 'rxjs/operators'
import $ from 'jquery';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private _router: Router,
        private _authenticationService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(retry(1),
            //This is where we ue logic
            catchError((error: HttpErrorResponse) => {

                switch (error.status) {
                    case 0:
                        // server error
                        console.log("NEtwork error")
                        break;

                    case 400:
                        //not found
                        this._router.navigate(['not-authorized'])
                        break;

                    case 401:
                        //use refresh token
                        this._router.navigate(['not-authorized'])
                        break;

                    case 403:
                        //not authorized
                        this._router.navigate(['not-authorized'])
                        break;

                    case 404:
                        //could not find client request
                        break;

                    case 405:
                        //not allowed this method
                        break;

                    case 406:
                        // not able to fulfill request
                        break;

                    case 407:
                        //request time out
                        break;

                    case 409:
                        //request conflict
                        this._router.navigate(['ok-there'])
                        break;

                    case 410:
                        //no longer available
                        break;

                    case 500:
                        $('.modal-backdrop').remove();
                        this._router.navigate(['server-error'])

                        // setTimeout(()=>{
                        //   window.location.reload();
                        // },7000)
                        // internal server serror
                        break;

                    case 502:
                        //bad request
                        break;

                    case 503:
                        // service unavailable
                        break;

                    case 504:
                        //service gateway timeout
                        break;

                    default:
                        return throwError(error);
                        break;
                }
            })
        )
    }

}
