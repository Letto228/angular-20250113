import {signal} from '@angular/core';
import {Product} from './product.interface';
import {productsMock} from './products.mock';

export class ProductsStoreService {
    readonly products = signal<Product[]>([]);

    loadProducts(): void {
        setTimeout(() => {
            this.products.set(productsMock);
        }, 3000);
    }
}
