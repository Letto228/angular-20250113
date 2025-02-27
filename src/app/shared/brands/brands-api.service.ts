import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {getParamsFromObject} from '../params/get-params-from-object';

@Injectable({
    providedIn: 'root',
})
export class BrandsApiService {
    private readonly httpClient = inject(HttpClient);

    getBrands$(subCategoryId?: string | null): Observable<string[]> {
        return this.httpClient
            .get<{data: string[]}>('/brands', {
                params: getParamsFromObject({subCat: subCategoryId}),
            })
            .pipe(map(({data}) => data));
    }
}
