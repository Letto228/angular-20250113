import {map, Observable} from 'rxjs';
import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './product.interface';
import {SubCategory} from '../categories/sub-category.interface';
import {getParamsFromObject} from '../params/get-params-from-object';

type ProductsDto = {
    data: {
        items: Product[];
    };
};

@Injectable({providedIn: 'root'})
export class ProductsApiService {
    private readonly httpClient = inject(HttpClient);

    getProducts$(subCategoryId?: SubCategory['_id'] | null): Observable<Product[]> {
        return this.httpClient
            .get<ProductsDto>(`products`, {params: getParamsFromObject({subCat: subCategoryId})})
            .pipe(map(({data}: ProductsDto): Product[] => data.items));
    }

    getProduct$(id: Product['_id']): Observable<Product | undefined> {
        return this.httpClient.get<{data: Product}>(`products/${id}`).pipe(map(({data}) => data));
    }
}
