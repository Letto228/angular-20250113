import {
    ApplicationConfig,
    inject,
    InjectionToken,
    provideZoneChangeDetection,
    signal,
    WritableSignal,
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {routes} from './app.routes';
import {ProductsStoreService} from './shared/products/products-store.service';

// Token
// 1. Class
// 2. InjectionToken

export class ApplicationService {
    readonly flag = signal(false);
}

export const testToken = new InjectionToken<WritableSignal<boolean>>('Test token');
export const aliasToken = new InjectionToken<ApplicationService>('Test alias');

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideAnimationsAsync(),
        // {
        //     provide: testToken, // token
        //     useValue: signal(false),
        // },
        // {
        //     provide: testToken, // token
        //     useFactory: () => signal(false),
        // },
        // {
        //     provide: ApplicationService,
        //     useClass: ApplicationService,
        // },
        // {
        //     provide: ApplicationService,
        //     useFactory: () => new ApplicationService(),
        // },
        // ApplicationService,
        // {
        //     provide: aliasToken,
        //     // useClass: ApplicationService,
        //     useExisting: ApplicationService, // token
        // },
        {
            provide: aliasToken,
            useFactory: () => inject(ApplicationService), // token
        },
        // {
        //     provide: ProductsStoreService,
        //     useClass: ProductsStoreService,
        // },
        ProductsStoreService,
    ],
};
