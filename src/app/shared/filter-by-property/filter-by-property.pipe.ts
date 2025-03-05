import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
    standalone: true,
    pure: true,
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T, Key extends keyof T, TKeyValue extends T[Key]>(
        value: T[] | null,
        key: Key,
        searchValue: TKeyValue,
    ): T[] | null {
        if (!value) {
            return null;
        }

        return value.filter(element => this.isSatisfiesFilter(element[key], searchValue));
    }

    private isSatisfiesFilter<T>(value: T, searchValue: T): boolean {
        if (typeof value === 'string') {
            return (value as string).includes(searchValue as string);
        }

        return value === searchValue;
    }
}
