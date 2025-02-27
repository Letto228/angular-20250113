import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/products-list',
        pathMatch: 'full',
    },
    {
        path: 'products-list',
        loadChildren: () =>
            import('./pages/products-list/products-list.routes').then(m => m.routes),
    },
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
