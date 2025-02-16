import {Directive, output} from '@angular/core';

@Directive({
    selector: '[appScrollWithLoading]',
    standalone: true,
    host: {
        '(scroll)': 'onScroll($event)',
    },
})
export class ScrollWithLoadingDirective {
    readonly loadNextData = output();

    onScroll({target}: Event) {
        if (!target || !(target instanceof HTMLElement)) {
            return;
        }

        const {scrollHeight, offsetHeight, scrollTop} = target;

        if (scrollTop + offsetHeight + 100 > scrollHeight) {
            this.loadNextData.emit();
        }
    }
}
