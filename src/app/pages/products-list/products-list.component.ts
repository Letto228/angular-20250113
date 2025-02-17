import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CardComponent} from './card/card.component';
import {productsMock} from '../../shared/products/products.mock';
import {Product} from '../../shared/products/product.interface';
import {PaginationDirective} from '../../shared/pagination/pagination.directive';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CardComponent, CommonModule, MatIconModule, PaginationDirective, MatButtonModule],
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
