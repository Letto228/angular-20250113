import {inject, Injectable, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {BrandsApiService} from './brands-api.service';

@Injectable({
    providedIn: 'root',
})
export class BrandsService {
    private readonly brandsApiService = inject(BrandsApiService);

    private readonly brandsStore = signal<string[] | null>(null);

    private loadBrandsSubscription: Subscription | null = null;

    getBrands(): string[] | null {
        return this.brandsStore();
    }

    loadBrands(subCategoryId?: string | null) {
        if (this.loadBrandsSubscription) {
            this.loadBrandsSubscription.unsubscribe();
        }

        this.loadBrandsSubscription = this.brandsApiService
            .getBrands$(subCategoryId)
            .subscribe(brands => {
                this.brandsStore.set(brands);

                this.loadBrandsSubscription = null;
            });
    }
}
