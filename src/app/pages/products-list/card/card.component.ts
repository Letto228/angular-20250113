import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {productsMock} from '../../../shared/products/products.mock';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [MatCardModule, MatChipsModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    data = productsMock[0];

    onClick(e: Event) {
        e.stopPropagation();
        // eslint-disable-next-line no-console
        console.log('Buy product');
    }
}
