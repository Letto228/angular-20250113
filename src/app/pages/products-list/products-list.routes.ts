import {Routes} from '@angular/router';
import {ProductsListComponent} from './products-list.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductsListComponent,
    },
    {
        path: ':subCategoryId',
        component: ProductsListComponent,
    },
];
