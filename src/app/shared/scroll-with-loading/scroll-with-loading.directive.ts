import {Directive, output} from '@angular/core';
import {isScrollReachedBottomOffcet} from './utils/is-scroll-reached-bottom-offcet';

@Directive({
    selector: '[appScrollWithLoading]',
    standalone: true,
    host: {
        '(scroll)': 'onScroll($event.target)',
    },
})
export class ScrollWithLoadingDirective {
    private prevScrollTop = -1;

    readonly loadNextData = output<void>();

    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        const prevScrollTop = this.prevScrollTop;

        this.prevScrollTop = scrollTop;

        const lowerScrollPosition = scrollHeight - clientHeight;
        const shouldLoadMessagesDown = isScrollReachedBottomOffcet(
            scrollTop,
            lowerScrollPosition,
            prevScrollTop,
        );

        if (shouldLoadMessagesDown) {
            this.loadNextData.emit();
        }
    }
}
