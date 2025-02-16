import {Directive, output} from '@angular/core';

@Directive({
    selector: '[appScrollWithLoading]',
    standalone: true,
    host: {
        '(scroll)': 'onScroll($event)',
    },
})
export class InfinityScrollDirective {
    private lastScrollTop = 0;
    loadNextData = output<void>();

    onScroll(event: Event) {
        const element = event.target as HTMLElement;
        const scrollTop = element.scrollTop;
        const clientHeight = element.clientHeight;
        const scrollHeight = element.scrollHeight;

        const isScrollingDown = scrollTop > this.lastScrollTop;

        if (isScrollingDown && scrollTop + clientHeight >= scrollHeight - 100) {
            this.loadNextData.emit();
        }

        this.lastScrollTop = scrollTop;
    }
}
