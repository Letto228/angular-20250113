import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
    standalone: true,
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<I, K extends keyof I>(
        list: I[] | null | undefined,
        property: K,
        value: I[K],
    ): I[] | null {
        if (!list) {
            return null;
        }

        return list.filter((item: I) =>
            typeof item[property] === 'string'
                ? item[property].includes(value as string)
                : item[property] === value,
        );
    }
}
