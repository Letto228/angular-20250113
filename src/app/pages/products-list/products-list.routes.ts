import {Routes} from '@angular/router';
import {productListRoutesMatcher} from './product-list-routes-matcher';

export const productListRoutes: Routes = [
    {
        matcher: productListRoutesMatcher,
        loadComponent: () => import('./products-list.component').then(m => m.ProductsListComponent),
    },
];
