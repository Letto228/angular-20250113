import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {NgFor, NgIf} from '@angular/common';
import {productsMock} from '../../../shared/products/products.mock';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [NgFor, NgIf, MatCardModule, MatButtonModule, MatIcon],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    readonly product = productsMock[1];
    readonly ratingValue: number;
    readonly ratingItems: boolean[];

    constructor() {
        this.ratingValue = Math.floor(this.product.rating);
        this.ratingItems = this.computeRatingItems(this.ratingValue);
    }

    buy(event: Event) {
        event.stopPropagation(); // https://stackoverflow.com/a/5963688

        /* eslint-disable no-console */
        console.log('Buy product');
    }

    buyPropagationCard() {
        /* eslint-disable no-console */
        console.log('Stop propagation not works.');
    }

    computeRatingItems(ratingValue: number): boolean[] {
        const ratingItems: boolean[] = [false, false, false, false, false];

        for (let i = 0; i < ratingValue; i++) {
            ratingItems[i] = true;
        }

        return ratingItems;
    }
}
