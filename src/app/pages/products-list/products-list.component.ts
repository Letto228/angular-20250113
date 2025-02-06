import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CardComponent} from './card/card.component';
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
    productList = productsMock;

    addProductToCard(productId: string) {
        // eslint-disable-next-line no-console
        console.log(`addProductToCard.ProductId: '${productId}'`);
    }
}
