import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {productsMock} from '../../../shared/products/products.mock';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    readonly product = productsMock[0];

    onProductBuy(event: Event) {
        event.stopPropagation();

        console.log('buy');
    }
}
