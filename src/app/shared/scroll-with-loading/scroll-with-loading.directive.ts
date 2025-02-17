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

    private handleScroll(event: Event) {
        if (event.target instanceof HTMLElement) {
            const {scrollHeight, scrollTop, clientHeight} = event.target;

            const scrollBottom = scrollHeight - scrollTop - clientHeight;

            if (scrollBottom <= this.borderOffset && this.scrollTopLastValue < scrollTop) {
                this.loadNextData.emit();
            }

            this.scrollTopLastValue = scrollTop;
        }
    }
}
