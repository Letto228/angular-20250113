import {Directive, input, output} from '@angular/core';

@Directive({
    selector: '[appScrollWithLoading]',
    standalone: true,
    host: {
        '(scroll)': 'onScroll($event)',
    },
})
export class ScrollWithLoadingDirective {
    loadNextData = output<void>();
    borderOffset = input(100);
    lastScrollTop = 0;

    onScroll(event: Event & {target: HTMLElement}) {
        if (!event?.target) {
            return;
        }

        const {scrollHeight, scrollTop, clientHeight} = event.target;

        if (
            this.lastScrollTop < scrollTop &&
            scrollHeight - scrollTop - clientHeight <= this.borderOffset()
        ) {
            this.loadNextData.emit();
        }

        this.lastScrollTop = scrollTop;
    }
}
