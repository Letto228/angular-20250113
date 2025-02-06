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
    readonly productInput = input.required<Product>();
    readonly productIdOutput = output<string>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (!this.productInput()) {
            return;
        }

        this.productIdOutput.emit(this.productInput()._id);
    }

    isStarActive(starIndex: number): boolean {
        return !!this.productInput() && this.productInput().rating >= starIndex;
    }
}
