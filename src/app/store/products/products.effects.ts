import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs';
// import {Store} from '@ngrx/store';
import {ProductsApiService} from '../../shared/products/products-api.service';
import {addProducts, loadProducts} from './products.actions';

export class ProductsEffects {
    private readonly actions$ = inject(Actions);
    // private readonly store$ = inject(Store);
    private readonly productsApiService = inject(ProductsApiService);

    loadProducts$ = createEffect(
        () =>
            this.actions$.pipe(
                // filter(action => action.type === loadProducts.type),
                ofType(loadProducts),
                switchMap(({subCategoryId}) =>
                    this.productsApiService.getProducts$(subCategoryId).pipe(
                        // tap(products => {
                        //     this.store$.dispatch(addProducts(products));
                        // }),
                        map(products => addProducts(products)),
                    ),
                ),
            ),
        // {dispatch: false},
    );
}
