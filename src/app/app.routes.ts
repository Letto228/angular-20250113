import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/products-list',
        pathMatch: 'full',
    },
    {
        path: 'products-list',
        // component: ProductsListComponent,
        loadComponent: () =>
            import('./pages/products-list/products-list.component').then(
                m => m.ProductsListComponent,
            ),
    },
    {
        path: 'product',
        loadChildren: () => import('./pages/product/product.routes').then(m => m.routes),
        // children: [
        //     {
        //         path: 'id',
        //         component: ProductComponent,
        //         children: [
        //             {
        //                 path: '',
        //                 redirectTo: 'description',
        //                 pathMatch: 'full',
        //             },
        //             {
        //                 path: 'type',
        //                 component: TypeComponent,
        //             },
        //             {
        //                 path: 'description',
        //                 component: DescriptionComponent,
        //             },
        //         ],
        //     },
        // ],
        // component: ProductComponent,
        // children: [
        //     {
        //         path: '',
        //         redirectTo: 'description',
        //         pathMatch: 'full',
        //     },
        //     {
        //         path: 'type',
        //         component: TypeComponent,
        //     },
        //     {
        //         path: 'description',
        //         component: DescriptionComponent,
        //     },
        // ],
    },
    {
        path: '**',
        // component: NotFoundComponent,
        loadComponent: () =>
            import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    },
];
