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
    private readonly chunkSize = 5;
    private readonly chunkNum = signal(0);

    readonly products = signal<Product[] | null>(null);

    constructor() {
        setTimeout(() => {
            this.products.set(
                [...productsMock].splice(this.chunkNum() * this.chunkSize, this.chunkSize),
            );
            // eslint-disable-next-line no-console
            console.log(`Loaded chunk ${this.chunkNum()}`);

            this.chunkNum.update(prev => prev + 1);
        }, 3000);
    }

    loadNextProducts() {
        if (this.products()?.length === productsMock.length) {
            // eslint-disable-next-line no-console
            console.log('All products loaded');

            return;
        }

        this.products.update(prevProducts => {
            const currentChunkNum = this.chunkNum();

            this.chunkNum.update(prev => prev + 1);

            // eslint-disable-next-line no-console
            console.log(`Loaded chunk ${currentChunkNum}`);

            return [
                ...(prevProducts || []),
                ...[...productsMock].splice(currentChunkNum * this.chunkSize, this.chunkSize),
            ];
        });
    }
}
