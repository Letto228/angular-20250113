/* eslint-disable no-unsafe-optional-chaining */
import {Directive, input, output} from '@angular/core';

@Directive({
    selector: '[appScrollWithLoading]',
    standalone: true,
    host: {
        '(scroll)': 'handleScroll($event)',
    },
})
export class ScrollWithLoadingDirective {
    readonly borderOffset = input(0);
    loadNextData = output<Event>();

    handleScroll(e: Event) {
        const scrollContainer = e.target as HTMLElement;
        const positionFromTop =
            scrollContainer?.getBoundingClientRect().height + scrollContainer?.scrollTop;
        const targetScrollHeight = scrollContainer?.scrollHeight - this.borderOffset();

        if (positionFromTop >= targetScrollHeight) {
            this.loadNextData.emit(e);
        }
    }
}
