import {Routes} from '@angular/router';
import {productListRoutes} from './pages/products-list/products-list.routes';

export const routes: Routes = [
    ...productListRoutes,
    {
        path: 'product',
        loadChildren: () => import('./pages/product/product.routes').then(m => m.routes),
    },
    {
        path: '**',
        loadComponent: () =>
            import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    },
];
