import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {map} from 'rxjs';
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
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly productsStoreService = inject(ProductsStoreService);

    readonly products = this.productsStoreService.products;

    constructor() {
        this.listenSubCategoryIdForLoad();
    }

    private listenSubCategoryIdForLoad() {
        this.activatedRoute.paramMap
            .pipe(
                map(paramsMap => paramsMap.get('subCategoryId')),
                takeUntilDestroyed(),
            )
            .subscribe(id => {
                this.productsStoreService.loadProducts(id);
            });
    }
}
