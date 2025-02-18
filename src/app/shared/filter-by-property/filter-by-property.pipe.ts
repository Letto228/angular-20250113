import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
    standalone: true,
    pure: true,
})
export class FilterByPropertyPipe<T> implements PipeTransform {
    transform<K extends keyof T, V extends T[K]>(
        items: T[],
        propertyName: K,
        searchPropertyValue: V,
    ): T[] {
        return items.filter(x => {
            const value = x[propertyName];

            if (typeof value === 'string' && typeof searchPropertyValue === 'string') {
                return value.includes(searchPropertyValue);
            }

            return value === searchPropertyValue;
        });
    }
}
