import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';
import {CarouselDirective} from '../../shared/carousel/carousel.directive';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [
        CarouselDirective,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        RouterOutlet,
        RouterLink,
    ],
    templateUrl: './product.component.html',
    styleUrl: './product.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    private readonly productsStoreService = inject(ProductsStoreService);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly router = inject(Router);

    readonly product = this.productsStoreService.currentProduct;

    constructor() {
        this.listenProductIdForLoad();
    }

    private listenProductIdForLoad() {
        this.activatedRoute.paramMap
            .pipe(
                map(paramsMap => paramsMap.get('id')),
                filter(Boolean),
                takeUntilDestroyed(),
            )
            .subscribe(id => {
                this.productsStoreService.loadProduct(id);
            });
    }
}
