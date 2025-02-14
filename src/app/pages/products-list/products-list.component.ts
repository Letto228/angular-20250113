import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card/card.component';
import {Product} from '../../shared/products/product.interface';
import {ScrollDirective} from '../../shared/scroll/scroll.directive';
import {productsMock} from '../../shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CardComponent, CommonModule, ScrollDirective],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    readonly products = input.required<Product[]>();

    // constructor() {
    //     //setTimeout(() => {
    //     //    this.products.set(productsMock);
    //     //}, 3000);
    // }

    doProductsLoad(event: Event) {
        this.products()?.push(productsMock[0]);
        this.products()?.push(productsMock[1]);
        this.products()?.push(productsMock[2]);

        // eslint-disable-next-line no-console
        console.log(event);
    }
}
