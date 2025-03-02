import {Routes} from '@angular/router';
import {productsListMatcher} from './shared/route-matchers/products-list-matcher';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/products-list',
        pathMatch: 'full',
    },
    {
        matcher: productsListMatcher,
        loadComponent: () =>
            import('./pages/products-list/products-list.component').then(
                m => m.ProductsListComponent,
            ),
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
