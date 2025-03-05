import {Product} from '../../shared/products/product.interface';

export const PRODUCTS_FEATURE = 'products';

// export type ProductsStore = {
export type ProductsState = {
    currentProductId: null | Product['_id'];
    data: null | Product[];
};

export const productsInitialState: ProductsState = {
    data: null,
    currentProductId: null,
};
