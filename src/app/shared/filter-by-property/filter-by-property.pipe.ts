import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
    standalone: true,
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T, D extends keyof T>(data: T[] | null, key: D, searchValue: unknown): T[] | null {
        if (!data || searchValue === undefined || searchValue === null) {
            return null;
        }

        if (typeof searchValue === 'string') {
            return data.filter(product =>
                String(product[key]).toLowerCase().includes(searchValue.toString().toLowerCase()),
            );
        }

        return data.filter(product => product[key] === searchValue);
    }
}
