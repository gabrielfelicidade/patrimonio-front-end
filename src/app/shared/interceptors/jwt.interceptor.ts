import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '../../constants/api.config';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let N = ApiConfig.API_ENDPOINT.length;
        let thisRoute = request.url.substring(0, N);
        let token = localStorage.getItem('token');
        if (thisRoute == ApiConfig.API_ENDPOINT) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}