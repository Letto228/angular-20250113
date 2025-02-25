import {Routes} from '@angular/router';
import {ProductComponent} from './product.component';
import {TypeComponent} from './type/type.component';
import {DescriptionComponent} from './description/description.component';

export const routes: Routes = [
    {
        path: ':id',
        component: ProductComponent,
        children: [
            {
                path: '',
                redirectTo: 'description',
                pathMatch: 'full',
            },
            {
                path: 'type',
                component: TypeComponent,
            },
            {
                path: 'description',
                component: DescriptionComponent,
            },
        ],
    },
];
