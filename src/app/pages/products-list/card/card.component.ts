import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Product} from '../../../shared/products/product.interface';

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
    productAdded = output<Product>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        const product = this.product();

        if (!product) {
            return;
        }

        this.productAdded.emit(product);
    }

    isStarActive(starIndex: number): boolean {
        const productRating = this.product()?.rating;

        return productRating ? productRating >= starIndex : false;
    }
}
