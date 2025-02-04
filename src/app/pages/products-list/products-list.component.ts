import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CardComponent} from './card/card.component';
import {Product} from '../../shared/products/product.interface';
import {productsMock} from '../../shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CardComponent],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    productSignal = signal<Product>(productsMock[0]);

    onAddProductToBasket(data: Product) {
        // eslint-disable-next-line no-console
        console.log(data);
    }
}
