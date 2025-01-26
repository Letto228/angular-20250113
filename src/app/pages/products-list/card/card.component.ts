import {Component, input, Signal} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Product} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [MatCard, MatCardContent, MatButton, MatCardImage],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    product = input<Signal<Product>>();

    onBuy(event: MouseEvent) {
        event.stopPropagation();
    }
}
