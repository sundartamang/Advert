import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    urlPath: any;

    constructor(
        private authenticationService: AuthenticationService,
        private _router: Router,
        private readonly location: Location

    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isLoggedIn = this.authenticationService.isLoggedIn
        var token = this.authenticationService.getAccessToken

        if (isLoggedIn) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                },
            });
        }

        return next.handle(request).pipe(
            catchError((err) => {
                console.warn("************************...................................................", err)
                if ([401, 403].indexOf(err.status) !== -1) {
                    this.authenticationService.logout()
                    this._router.navigate(['/'])
                }
                else {
                    return next.handle(request);
                }
            }),
        );
    }
}
