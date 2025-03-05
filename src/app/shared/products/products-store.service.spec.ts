import {TestBed} from '@angular/core/testing';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing';

import {effect, Injector} from '@angular/core';
import {ProductsStoreService} from './products-store.service';
import {productsMock} from './products.mock';

// const httpClientMock: HttpClient = {
//     get(_url: string, _options: unknown): Observable<never> {
//         return EMPTY;
//     },
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
// } as any as HttpClient;

describe('ProductsStoreService', () => {
    let service: ProductsStoreService;
    let injector: Injector;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            // providers: [
            //     ...provideHttpClientTesting(),
            //     //     {
            //     //         provide: HttpClient,
            //     //         useValue: httpClientMock,
            //     //     },
            // ],
        });
    });

    beforeEach(() => {
        service = TestBed.inject(ProductsStoreService);
        injector = TestBed.inject(Injector);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    // it('should be created', fakeAsync(() => {
    //     spyOn(httpClientMock, 'get').and.returnValue(
    //         timer(10).pipe(map(() => ({data: {items: productsMock}}))),
    //     );

    //     service.loadProducts();

    //     tick(10);

    //     expect(service.products()).toEqual(productsMock);
    // }));

    it('should be created', done => {
        service.loadProducts();

        httpTestingController.expectOne('products').flush({data: {items: productsMock}});

        const effectRef = effect(
            () => {
                const products = service.products();

                if (products) {
                    expect(products).toEqual(productsMock);

                    effectRef.destroy();
                    done();
                }
            },
            {injector},
        );
    });
});
