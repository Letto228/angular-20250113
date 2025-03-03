import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {filter, map} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
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
    private readonly activatedRoute = inject(ActivatedRoute);
    readonly products = this.productsStoreService.products;

    constructor() {
        this.productsStoreService.loadProducts();
        this.listenProductIdForLoad();
    }

    private listenProductIdForLoad() {
        this.activatedRoute.queryParams
            .pipe(
                map(queryParams => queryParams['subcategoryid']), // eslint-disable-line
                filter(Boolean),
                takeUntilDestroyed(),
            )
            .subscribe(subcategoryid => {
                this.productsStoreService.loadProducts(subcategoryid);
            });
    }
}
