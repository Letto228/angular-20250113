import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
    standalone: true,
})
export class FilterByPropertyPipe implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform<T extends any[], Obj extends T[number], Key extends keyof Obj>(
        array: T,
        propertyName: Key,
        propertyValue: Obj[Key],
    ) {
        return array.filter(item => {
            const testValue = item[propertyName];

            if (typeof propertyValue === 'string' && testValue.includes(propertyValue)) {
                return true;
            }

            return testValue === propertyValue;
        });
    }
}
