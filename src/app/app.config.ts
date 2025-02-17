import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {routes} from './app.routes';
import {ProductsStoreService} from './shared/products/products-store.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideAnimationsAsync(),
        ProductsStoreService,
    ],
};
