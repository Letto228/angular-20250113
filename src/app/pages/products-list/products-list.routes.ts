import {Routes} from '@angular/router';
import {ProductsListComponent} from './products-list.component';
import {productsListMatcher} from './products-list-url-matcher';

export const routes: Routes = [
    {
        matcher: productsListMatcher,
        component: ProductsListComponent,
    },
];
