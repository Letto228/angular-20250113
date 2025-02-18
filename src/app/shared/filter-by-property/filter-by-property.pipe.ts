import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
    standalone: true,
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T, Key extends keyof T>(array: T[], propertyName: Key, propertyValue: T[Key]) {
        return array.filter(item => {
            const testValue = item[propertyName];

            if (
                typeof propertyValue === 'string' &&
                typeof testValue === 'string' &&
                testValue.includes(propertyValue)
            ) {
                return true;
            }

            return testValue === propertyValue;
        });
    }
}
