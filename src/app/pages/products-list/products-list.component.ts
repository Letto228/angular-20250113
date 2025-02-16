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
    readonly products = signal<Product[]>([], {
        equal: (a, b) => {
            if (a.length !== b.length) {
                return false;
            }

            return true;
        },
    });

    constructor() {
        setTimeout(() => {
            this.loadNextProducts();
        }, 3000);
    }

    loadNextProducts(): void {
        const nextProducts: Product[] = [];
        const currentLength = this.products().length;
        const stepArray = 4;

        for (let i = currentLength; i < currentLength + stepArray && i < productsMock.length; i++) {
            nextProducts.push(productsMock[i]);
        }

        this.products.update(value => {
            return [...value, ...nextProducts];
        });
    }
}
