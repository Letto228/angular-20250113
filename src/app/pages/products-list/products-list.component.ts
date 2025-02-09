import {Component} from '@angular/core';
import {CardComponent} from './card/card.component';
import {Product} from '../../shared/products/product.interface';
import {productsMock} from '../../shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CardComponent],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
    readonly products: Product[] = productsMock;

    onBuyProduct(product: Product) {
        console.info('Product added to cart', product);
    }
}
