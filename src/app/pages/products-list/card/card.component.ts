import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import type {Product} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
    readonly product = input<Product>();
    readonly productAddedToCard = output<Product['_id']>();

    onProductBuy(event: Event) {
        event.stopPropagation();
        const product = this.product();

        if (!product) {
            return;
        }

        this.productAddedToCard.emit(product._id);
    }

    isStarActive(starIndex: number): boolean {
        const product = this.product();

        return !!product && product.rating >= starIndex;
    }
}
