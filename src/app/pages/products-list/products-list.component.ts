import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CardComponent} from './card/card.component';
import {productsMock} from '../../shared/products/products.mock';
import {Product} from '../../shared/products/product.interface';
import {ScrollWithLoadingDirective} from '../../shared/scroll-with-loading/scroll-with-loading.directive';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CardComponent, CommonModule, ScrollWithLoadingDirective, MatProgressSpinnerModule],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    private readonly loadedChunkSize = 4;

    readonly isProductListChunkLoading = signal<boolean>(false);
    readonly products = signal<Product[] | null>(null);

    constructor() {
        this.loadNextProducts();
    }

    loadProductsListChunk(): void {
        this.isProductListChunkLoading.set(true);

        setTimeout(() => {
            const startIndex = this.products()?.length ?? 0;
            const endIndex = startIndex + this.loadedChunkSize;

            this.products.update(currentProducts => [
                ...(currentProducts ?? []),
                ...productsMock.slice(startIndex, endIndex),
            ]);

            this.isProductListChunkLoading.set(false);
        }, 3000);
    }

    loadNextProducts(): void {
        const isAllProductsLoaded = this.products()?.length === productsMock.length;

        // не загружаем ничего, если загрузка уже идёт или все продукты уже загружены
        if (this.isProductListChunkLoading() || isAllProductsLoaded) {
            return;
        }

        this.loadProductsListChunk();
    }
}
