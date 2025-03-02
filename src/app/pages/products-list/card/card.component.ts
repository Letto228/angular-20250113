import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {productsMock} from '../../../shared/products/products.mock';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [MatCardModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    img = productsMock[0].images[0].url;
    name = productsMock[0].name;
    price = `${productsMock[0].price} $`;

    buy($event: MouseEvent) {
        $event.stopPropagation();
    }
}
