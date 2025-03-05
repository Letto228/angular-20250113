import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card/card.component';
import {ScrollWithLoadingDirective} from '../../shared/scroll-with-loading/scroll-with-loading.directive';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {FilterByPropertyPipe} from '../../shared/filter-by-property/filter-by-property.pipe';

@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [CardComponent, CommonModule, ScrollWithLoadingDirective, FilterByPropertyPipe],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    private readonly productsStoreService = inject(ProductsStoreService);

    readonly products = this.productsStoreService.products;

    // For easy
    readonly name = signal('Мышь');

    // For hard
    readonly propertyName = 'name' as const; // keyof Product
    readonly searchPropertyValue = signal('Мышь');

    constructor() {
        this.productsStoreService.loadProducts();
    }
}
