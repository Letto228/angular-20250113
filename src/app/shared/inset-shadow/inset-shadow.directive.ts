import {Directive, signal} from '@angular/core';

@Directive({
    selector: '[appInsetShadow]',
    standalone: true,
    host: {
        '(click)': 'toggleShadow()',
        '[style.boxShadow]': 'boxShadow()',
    },
})
export class InsetShadowDirective {
    readonly boxShadow = signal('');

    toggleShadow() {
        this.boxShadow.update(currentBoxShadow => (!currentBoxShadow ? 'inset 0 0 10px #fff' : ''));
    }
}
