import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error/error.interceptor';
import { AuthInterceptor } from './auth/auth.interceptor';

export const HttpInterceptorProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
]

