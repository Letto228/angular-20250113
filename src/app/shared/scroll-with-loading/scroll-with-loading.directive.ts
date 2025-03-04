import {Directive, output} from '@angular/core';

const SCROLL_LOADING_BORDER_OFFSET = 100;

@Directive({
    selector: '[appScrollWithLoading]',
    standalone: true,
    host: {
        '(scroll)': 'onScroll($event)',
    },
})
export class ScrollWithLoadingDirective {
    private lastScrollTop = 0;
    private lastLoadDataScrollTop: number | null = null;

    loadNextData = output<void>();

    onScroll(event: Event) {
        const {scrollTop, clientHeight, scrollHeight} = event.target as HTMLElement;

        const isScrollBottom = scrollTop > this.lastScrollTop;
        const isCloseToBorderOffset =
            scrollHeight - scrollTop - clientHeight <= SCROLL_LOADING_BORDER_OFFSET;
        const isAlreadyLoadForThisScroll =
            this.lastLoadDataScrollTop &&
            this.lastLoadDataScrollTop - scrollTop <= SCROLL_LOADING_BORDER_OFFSET;
        const isNeedLoadNextData =
            isScrollBottom && isCloseToBorderOffset && !isAlreadyLoadForThisScroll;

        if (isNeedLoadNextData) {
            this.loadNextData.emit();
            this.lastLoadDataScrollTop = scrollTop;
        }

        this.lastScrollTop = scrollTop;
    }
}
