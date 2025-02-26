import {inject, Injectable, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {Product} from './product.interface';
import {ProductsApiService} from './products-api.service';

@Injectable({providedIn: 'root'})
export class ProductsStoreService {
    private readonly productsApiService = inject(ProductsApiService);

    private loadProductsSubscription: Subscription | null = null;
    private loadCurrentProductSubscription: Subscription | null = null;

    readonly products = signal<Product[] | null>(null);
    readonly currentProduct = signal<Product | null>(null);

    loadProducts(subCategoryId: string | null): void {
        if (this.loadProductsSubscription) {
            this.loadProductsSubscription.unsubscribe();
        }

        this.loadProductsSubscription = this.productsApiService
            .getProducts$(subCategoryId)
            .subscribe(products => {
                this.products.set(products);

                this.loadProductsSubscription = null;
            });
    }

    loadProduct(id: Product['_id']) {
        if (this.loadCurrentProductSubscription) {
            this.loadCurrentProductSubscription.unsubscribe();
        }

        const productPreview = this.products()?.find(({_id}) => _id === id);

        this.currentProduct.set(productPreview || null);

        this.loadCurrentProductSubscription = this.productsApiService
            .getProduct$(id)
            .subscribe(product => {
                this.currentProduct.set(product || null);

                this.loadCurrentProductSubscription = null;
            });
    }
}
