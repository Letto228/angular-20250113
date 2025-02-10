import {
    ChangeDetectionStrategy,
    Component,
    TemplateRef,
    viewChild,
    ViewContainerRef,
} from '@angular/core';
import {CardComponent} from './card/card.component';
import {productsMock} from '../../shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CardComponent],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    private readonly productViewport = viewChild.required('productTemplate', {
        read: ViewContainerRef,
    });

    private readonly productTemplate = viewChild.required('productTemplate', {read: TemplateRef});

    readonly products = productsMock;

    constructor() {
        setTimeout(() => {
            this.products.forEach(product => {
                this.productViewport().createEmbeddedView(this.productTemplate(), {
                    $implicit: product,
                });
            });
        }, 1000);
    }
}
