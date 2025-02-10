import {
    ChangeDetectionStrategy,
    Component,
    signal,
    TemplateRef,
    viewChild,
    ViewContainerRef,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card/card.component';
import {productsMock} from '../../shared/products/products.mock';
import {Product} from '../../shared/products/product.interface';
import {MyNgIfDirective} from '../../shared/my-ng-if/my-ng-if.directive';
import {CarouselDirective} from '../../shared/carousel/carousel.directive';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CardComponent, MyNgIfDirective, CommonModule, CarouselDirective],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    private readonly productViewport = viewChild.required('productTemplate', {
        read: ViewContainerRef,
    });

    private readonly productTemplate = viewChild.required('productTemplate', {read: TemplateRef});

    readonly products = signal<Product[] | null>(null);

    constructor() {
        setTimeout(() => {
            this.products.set(productsMock);
        }, 3000);
        // setTimeout(() => {
        //     this.products.set([...productsMock]);
        // }, 6000);
        setTimeout(() => {
            this.products.set(productsMock.map(item => ({...item, feedbacksCount: 1})));
        }, 6000);

        // setTimeout(() => {
        //     this.products.set(null);
        // }, 6000);

        // effect(() => {
        //     this.products()?.forEach(product => {
        //         this.productViewport().createEmbeddedView(this.productTemplate(), {
        //             $implicit: product,
        //         });
        //     });
        // });

        // setTimeout(() => {
        //     this.products.forEach(product => {
        //         this.productViewport().createEmbeddedView(this.productTemplate(), {
        //             $implicit: product,
        //         });
        //     });
        // }, 1000);
    }

    trackBy(_index: number, item: Product): Product['_id'] {
        return item._id;
    }

    // trackBy(oldValue) === trackBy(newValue)
}
