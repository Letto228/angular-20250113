import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Category} from './category.interface';

@Injectable({
    providedIn: 'root',
})
export class CategoriesApiService {
    private readonly httpClient = inject(HttpClient);

    loadCategories$(): Observable<Category[]> {
        return this.httpClient.get<{data: Category[]}>(`categories`).pipe(map(({data}) => data));
    }
}
