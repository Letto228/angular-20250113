import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'myCurrency',
    standalone: true,
    pure: true,
})
export class MyCurrencyPipe implements PipeTransform {
    transform(price: number, symbol: string): string {
        return `${price} ${symbol}`;
    }
}
