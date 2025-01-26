import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {productsMock} from '../../../shared/products/products.mock';
import type {Product} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    products: Product[] = productsMock;

    onClickBuyBtn(event: MouseEvent, productId: Product['_id']) {
        event.stopPropagation(); // останавливаем всплытие события вверх - к карточке
        console.info('The buy button was clicked; event data:', event, 'product id:', productId);
    }
}
