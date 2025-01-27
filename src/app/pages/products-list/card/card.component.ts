import { Component, input } from '@angular/core';
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Product } from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatButton,
        MatCardImage,
        MatCardActions,
        MatCardSubtitle,
    ],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    product = input.required<Product>();

    onPurchaseClick(event: Event) {
        event.preventDefault();
        console.info('onPurchaseClick', event);
    }

    onCardClick() {
        console.info(this.product());
    }
}
