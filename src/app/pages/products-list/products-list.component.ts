import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {CardComponent} from './card/card.component';
import {ScrollWithLoadingDirective} from '../../shared/scroll-with-loading/scroll-with-loading.directive';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {Product} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CardComponent, CommonModule, ScrollWithLoadingDirective, RouterLink],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    private readonly productsStoreService = inject(ProductsStoreService);
    private readonly router = inject(Router);

    readonly products = this.productsStoreService.products;

    constructor() {
        this.productsStoreService.loadProducts();
    }

    navigateToProduct(id: Product['_id']) {
        this.router.navigateByUrl(`/product/${id}`);
        // this.router.navigate(['/', 'product', id]);
    }
}
