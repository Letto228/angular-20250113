import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'myCurrency',
    standalone: true,
    pure: true,
    // pure: false, // impure
})
export class MyCurrencyPipe implements PipeTransform {
    transform(price: number, symbol: string): string {
        // eslint-disable-next-line no-console
        console.log('getCurrencyPipe');

        return `${price} ${symbol}`;
    }
}
