import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from './base-url';

export class BaseUrlClassInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const newRequest = request.clone({
            url: `${baseUrl}/${request.url}`,
        });

        return next.handle(newRequest);
    }
}
