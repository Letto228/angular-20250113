import {inject, Injectable, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {CategoriesApiService} from './categories-api.service';
import {Category} from './category.interface';

@Injectable({
    providedIn: 'root',
})
export class CategoriesStoreService {
    private readonly categoriesApiService = inject(CategoriesApiService);

    private loadCategoriesSubscription: Subscription | null = null;

    private readonly categoriesStore = signal<Category[] | null>(null);

    getCategories(): Category[] | null {
        return this.categoriesStore();
    }

    loadCategories() {
        if (this.loadCategoriesSubscription) {
            this.loadCategoriesSubscription.unsubscribe();
        }

        this.loadCategoriesSubscription = this.categoriesApiService
            .loadCategories$()
            .subscribe(categories => {
                this.categoriesStore.set(categories);

                this.loadCategoriesSubscription = null;
            });
    }
}
