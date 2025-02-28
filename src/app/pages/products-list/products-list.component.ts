import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card/card.component';
import {productsMock} from '../../shared/products/products.mock';
import {Product} from '../../shared/products/product.interface';
import {ScrollWithLoadingDirective} from '../../shared/scroll-with-loading/scroll-with-loading.directive';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CardComponent, CommonModule, ScrollWithLoadingDirective],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    private readonly chunkSize = 3;
    private chunkCounts = 1;
    private isLoading = false;
    readonly products = signal<Product[] | null>(null);

    constructor() {
        this.loadNextProducts();
    }

    loadNextProducts() {
        if (!this.isLoading) {
            this.isLoading = true;
            setTimeout(() => {
                if (this.products.length < productsMock.length) {
                    this.products.set(productsMock.slice(0, this.chunkCounts * this.chunkSize));
                    this.chunkCounts += 1;
                    this.isLoading = false;
                }
            }, 3000);
        }
    }
}
