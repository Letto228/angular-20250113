import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {NgFor} from '@angular/common';
import {productsMock} from '../../../shared/products/products.mock';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [NgFor, MatCardModule, MatButtonModule, MatIcon],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    readonly product = productsMock[0];

    buy() {
        /* eslint-disable no-console */
        console.log('Buy product');
    }

    getRating() {
        const rating = Math.floor(this.product.rating);

        return [rating, 5 - rating];
    }
}
