import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card/card.component';
import {ScrollWithLoadingDirective} from '../../shared/scroll-with-loading/scroll-with-loading.directive';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CardComponent, CommonModule, ScrollWithLoadingDirective],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    private readonly productsStoreService = inject(ProductsStoreService);

    // readonly products = signal<Product[] | null>(null);
    readonly products = this.productsStoreService.products;

    constructor() {
        this.productsStoreService.loadProducts();
        // setTimeout(() => {
        //     this.products.set(productsMock);
        // }, 3000);
    }

    loadNextProducts(): void {
        // eslint-disable-next-line no-console
        console.log('Load next products');
    }
}
