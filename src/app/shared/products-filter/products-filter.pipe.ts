import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../products/product.interface';

@Pipe({
    name: 'productsFilter',
    standalone: true,
})
export class ProductsFilterPipe implements PipeTransform {
    transform(products: Product[] | null, searchName: string): Product[] | null {
        if (products === null) {
            return null;
        }

        return products?.filter(product => product.name.includes(searchName));
    }
}
