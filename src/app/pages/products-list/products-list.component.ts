import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {map} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {CardComponent} from './card/card.component';
import {ScrollWithLoadingDirective} from '../../shared/scroll-with-loading/scroll-with-loading.directive';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {FilterByPropertyPipe} from '../../shared/filter-by-property/filter-by-property.pipe';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [
        CardComponent,
        CommonModule,
        ScrollWithLoadingDirective,
        RouterLink,
        FilterByPropertyPipe,
    ],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    private readonly productsStoreService = inject(ProductsStoreService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);

    private readonly id = toSignal(this.route.queryParams.pipe(map(params => params.id || null)));

    readonly products = this.productsStoreService.products;

    constructor() {
        this.listenQueryParams();
    }

    listenQueryParams() {
        effect(() => {
            const currentId = this.id();

            this.productsStoreService.loadProducts(currentId);
        });
    }
}
