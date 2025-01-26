import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Product} from '../../../shared/products/product.interface';
import {ProductImage} from '../../../shared/products/product-image.interface';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [MatCardModule, MatButtonModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private _product!: Product;

    @Input({required: true})
    set product(p: Product) {
        this._product = p;
    }

    get productName(): string {
        return this._product.name;
    }

    get productFirstImage(): ProductImage {
        return this._product.images[0];
    }

    get productPrice(): number {
        return this._product.price;
    }

    onBuy() {
        // eslint-disable-next-line no-console
        console.log(`You buy product - ${this.productName}`);
    }
}
