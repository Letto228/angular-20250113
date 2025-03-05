import {createReducer, on} from '@ngrx/store';
import {productsInitialState} from './products.state';
import {addProducts} from './products.actions';

export const productsReducer = createReducer(
    productsInitialState,
    on(addProducts, (state, {products}) => ({
        ...state,
        data: products,
    })),
);
