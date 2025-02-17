import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
    standalone: true,
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T, P extends keyof T>(
        items: T[] | undefined | null,
        searchingProperty: P,
        searchValue: T[P],
    ): T[] | undefined | null {
        if (!items?.length) {
            return items;
        }

        if (typeof searchValue === 'string') {
            const searchValueUpperCase = searchValue.toUpperCase();

            return items.filter(item =>
                (item[searchingProperty] as string).toUpperCase().includes(searchValueUpperCase),
            );
        }

        return items.filter(item => item[searchingProperty] === searchValue);
    }
}
