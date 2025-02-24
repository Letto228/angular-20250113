import {inject, Injectable, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {Product} from './product.interface';
import {ProductsApiService} from './products-api.service';

@Injectable({providedIn: 'root'})
export class ProductsStoreService {
    private readonly productsApiService = inject(ProductsApiService);

    private loadProductsSubscription: Subscription | null = null;

    readonly products = signal<Product[] | null>(null);

    loadProducts(): void {
        if (this.loadProductsSubscription) {
            this.loadProductsSubscription.unsubscribe();
        }

        this.loadProductsSubscription = this.productsApiService
            .getProducts$()
            .subscribe(products => {
                this.products.set(products);

                this.loadProductsSubscription = null;
            });
    }
}
