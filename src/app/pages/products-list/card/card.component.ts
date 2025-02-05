import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {productsMock} from '../../../shared/products/products.mock';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [MatCardModule, MatButtonModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    readonly product = productsMock[0];
    readonly productImage = productsMock[0].images[0];
    readonly avatarStyles: Partial<CSSStyleDeclaration> = {
        backgroundImage: `url(${this.productImage.url})`,
    };

    onBuyBtnClick(event: Event) {
        event.stopPropagation();
        alert(`Product ${this.product.name} added to bucket!`);
    }
}
