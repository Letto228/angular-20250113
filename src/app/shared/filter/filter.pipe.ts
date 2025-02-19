import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../products/product.interface';

@Pipe({
    name: 'productsFilter',
    standalone: true,
})
export class FilterPipe implements PipeTransform {
    transform(products: Product[] | null, searchTerm: string): Product[] | null {
        if (!products?.length || searchTerm) {
            return products;
        }

        searchTerm = searchTerm.toLowerCase();

        return products.filter(product => product.name.toLowerCase().includes(searchTerm));
    }
}
