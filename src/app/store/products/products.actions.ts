import {createAction} from '@ngrx/store';
import {Product} from '../../shared/products/product.interface';
import {SubCategory} from '../../shared/categories/sub-category.interface';

export enum ProductsAntionTypes {
    AddProducts = '[Products] Add products',
    LoadProducts = '[Products] Load products',
}

export const loadProducts = createAction(
    ProductsAntionTypes.LoadProducts,
    (subCategoryId?: SubCategory['_id'] | null) => ({
        subCategoryId,
    }),
);

export const addProducts = createAction(ProductsAntionTypes.AddProducts, (products: Product[]) => ({
    products,
}));

// addProducts === (products: Product[]) => ({type: ProductsAntionTypes.AddProducts, products})
