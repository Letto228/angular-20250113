import {InjectionToken} from '@angular/core';

export const baseUrl = `https://course-angular.javascript.ru/api`;

export const baseUrlToken = new InjectionToken('Base url', {
    providedIn: 'root',
    factory: () => baseUrl,
});
