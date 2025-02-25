import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
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
        // this.productsStoreService.loadProduct('96-planset-dexp-ursus-s290-32-gb-3g-cernyj');
        // console.log(inject(ActivatedRoute).snapshot);

        // this.activatedRoute.paramMap
        //     // .pipe(takeUntilDestroyed())
        //     .subscribe(paramsMap => {
        //         const id = paramsMap.get('id');

        //         if (!id) {
        //             return;
        //         }

        //         this.productsStoreService.loadProduct(id);
        //     });
        this.activatedRoute.paramMap
            .pipe(
                map(paramsMap => paramsMap.get('id')),
                // filter(id => Boolean(id)),
                filter(Boolean),
                // takeUntilDestroyed(),
            )
            .subscribe(id => {
                this.productsStoreService.loadProduct(id);
            });
    }

    navigateTo(segment: 'type' | 'description'): void {
        // const urlTree = this.router.createUrlTree(['./', segment], {
        //     relativeTo: this.activatedRoute,
        // });

        // console.log(urlTree, urlTree.toString());

        // this.router.navigateByUrl(`./${segment}`);
        // this.router.navigateByUrl(urlTree);
        // this.router.navigateByUrl(urlTree.toString());

        this.router.navigate(['./', segment], {
            relativeTo: this.activatedRoute,
        });
    }
}
