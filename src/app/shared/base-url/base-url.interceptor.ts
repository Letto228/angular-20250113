import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {inject} from '@angular/core';
import {baseUrlToken} from './base-url';

export const baseUrlInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
    const baseUrl = inject(baseUrlToken);

    const newRequest = request.clone({
        url: `${baseUrl}/${request.url}`,
    });

    return next(newRequest);
};
