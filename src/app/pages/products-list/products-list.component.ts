import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, ActivatedRoute} from '@angular/router';
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
        this.listenForProductsCategoryChanges();
    }

    listenForProductsCategoryChanges(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            const categoryId = params.get('categoryId');

            this.productsStoreService.loadProducts(categoryId);
        });
    }
}
