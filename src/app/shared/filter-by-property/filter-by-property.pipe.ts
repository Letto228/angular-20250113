import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
    standalone: true,
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T, D extends keyof T>(data: T[] | null, key: D, value: T[D]): T[] | null {
        if (!data || value === undefined || value === null) {
            return null;
        }

        if (typeof value === 'string') {
            return data.filter(product =>
                String(product[key]).toLowerCase().includes(value.toLowerCase()),
            );
        }

        return data.filter(product => product[key] === value);
    }
}
