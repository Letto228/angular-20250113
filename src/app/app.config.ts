import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {routes} from './app.routes';
// import {ProductsStoreService} from './shared/products/products-store.service';
// import {ProductsApiService} from './shared/products/products-api.service';
import {baseUrlInterceptor} from './shared/base-url/base-url.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideAnimationsAsync(),
        // ProductsStoreService,
        // ProductsApiService,
        // provideHttpClient(withInterceptorsFromDi()),
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: BaseUrlClassInterceptor,
        //     multi: true,
        // },
        provideHttpClient(withInterceptors([baseUrlInterceptor])),
    ],
};
