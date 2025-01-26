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
    readonly productImgUrl = productsMock[0].images[0].url;
    readonly productId = 'testId98';
    readonly styles: Partial<CSSStyleDeclaration> = {
        backgroundImage: `url(${this.productImgUrl})`,
        backgroundSize: 'cover',
    };

    onBuyBtnClick(event: Event, payload: {productId: string}) {
        event.stopPropagation();
        alert(`Product ${payload.productId} added to bucket!`);
    }
}
