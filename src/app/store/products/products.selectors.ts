import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PRODUCTS_FEATURE, ProductsState} from './products.state';

export const productsFeatureSelector = createFeatureSelector<ProductsState>(PRODUCTS_FEATURE);
// (state: State): ProductsState => state[PRODUCTS_FEATURE]

export const productsSelector = createSelector(
    productsFeatureSelector,
    productsState => productsState.data, // extractFn
);
// productsSelector === (state: State) => extractFn(productsFeatureSelector(state))

export const currentProductIdSelector = createSelector(
    productsFeatureSelector,
    productsState => productsState.currentProductId, // extractFn
);
// currentProductIdSelector === (state: State) => extractFn(productsFeatureSelector(state))

export const currentProduct = createSelector(
    productsSelector,
    currentProductIdSelector,
    (products, currentProductId) => products?.find(({_id}) => currentProductId === _id), // extractFn
);
// currentProduct === (state: State) => extractFn(productsSelector(state), currentProductIdSelector(state))
