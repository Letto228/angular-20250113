import {Directive, output} from '@angular/core';

@Directive({
    selector: '[appScrollWithLoading]',
    standalone: true,
    host: {
        '(scroll)': 'handleScroll($event)',
    },
})
export class ScrollWithLoadingDirective {
    private readonly borderOffset = 100;
    private scrollTopLastValue = 0;
    readonly loadNextData = output();

    private handleScroll({target}: Event) {
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const {scrollHeight, scrollTop, clientHeight} = target;
        const scrollBottom = scrollHeight - scrollTop - clientHeight;

        if (scrollBottom <= this.borderOffset && this.scrollTopLastValue < scrollTop) {
            this.loadNextData.emit();
        }

        this.scrollTopLastValue = scrollTop;
    }
}
