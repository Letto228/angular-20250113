import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card/card.component';
import {productsMock} from '../../shared/products/products.mock';
import {Product} from '../../shared/products/product.interface';
import {PaginationOfDirective} from '../../shared/pagination-of/pagination-of.directive';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CardComponent, CommonModule, PaginationOfDirective],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    readonly products = signal<Product[] | null>(null);

    constructor() {
        setTimeout(() => {
            this.products.set(productsMock);
        }, 3000);
    }

    trackBy(_index: number, item: Product): Product['_id'] {
        return item._id;
    }
}
