import {Directive, input, output} from '@angular/core';

@Directive({
    selector: '[appScrollWithLoading]',
    standalone: true,
    host: {
        '(scroll)': 'handleScroll($event.target)',
    },
})
export class ScrollWithLoadingDirective {
    readonly borderOffset = input(0);
    readonly loadNextData = output<void>();

    handleScroll(scrollTarget: HTMLElement) {
        const {scrollTop, scrollHeight} = scrollTarget;
        const {height: clientViewHeight} = scrollTarget.getBoundingClientRect();
        const positionFromTop = clientViewHeight + scrollTop;
        const targetScrollHeight = scrollHeight - this.borderOffset();

        if (positionFromTop >= targetScrollHeight) {
            this.loadNextData.emit();
        }
    }
}
