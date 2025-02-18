import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
    standalone: true,
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<Data extends object>(
        data: Data[],
        propertyName: keyof Data,
        searchPropertyValue: unknown,
    ): Data[] {
        if (!data) {
            return [];
        }

        return data.filter((item, index) => {
            if (!Object.hasOwn(item, propertyName)) {
                console.warn(`No property [${String(propertyName)}] in item with index [${index}]`);

                return false;
            }

            const itemValue = item[propertyName];

            if (this.isString(searchPropertyValue)) {
                if (!this.isString(itemValue)) {
                    console.warn(
                        this.getWrongSearchValueTypeErrorMessage(
                            String(propertyName),
                            index,
                            searchPropertyValue,
                        ),
                    );

                    return false;
                }

                return itemValue.includes(searchPropertyValue);
            }

            if (this.isNumber(searchPropertyValue)) {
                if (!this.isNumber(itemValue)) {
                    console.warn(
                        this.getWrongSearchValueTypeErrorMessage(
                            String(propertyName),
                            index,
                            searchPropertyValue,
                        ),
                    );

                    return false;
                }

                return itemValue === searchPropertyValue;
            }

            if (this.isBoolean(searchPropertyValue)) {
                if (!this.isBoolean(itemValue)) {
                    console.warn(
                        this.getWrongSearchValueTypeErrorMessage(
                            String(propertyName),
                            index,
                            searchPropertyValue,
                        ),
                    );

                    return false;
                }

                return itemValue === searchPropertyValue;
            }

            if (this.isObject(searchPropertyValue)) {
                if (!this.isObject(itemValue)) {
                    console.warn(
                        this.getWrongSearchValueTypeErrorMessage(
                            String(propertyName),
                            index,
                            searchPropertyValue,
                        ),
                    );

                    return false;
                }

                return JSON.stringify(itemValue) === JSON.stringify(searchPropertyValue);
            }

            throw new Error(`Unknown type of search value ${searchPropertyValue}`);
        });
    }

    isString(value: unknown): value is string {
        return typeof value === 'string';
    }

    isNumber(value: unknown): value is number {
        return typeof value === 'number';
    }

    isBoolean(value: unknown): value is boolean {
        return typeof value === 'boolean';
    }

    isObject(value: unknown): value is object {
        return typeof value === 'object';
    }

    getWrongSearchValueTypeErrorMessage(
        propertyName: string,
        itemIndex: number,
        searchPropertyValue: unknown,
    ) {
        return `Type of property [${String(propertyName)}] in item with index [${itemIndex}] has nothing in common with search value [${searchPropertyValue}]`;
    }
}
