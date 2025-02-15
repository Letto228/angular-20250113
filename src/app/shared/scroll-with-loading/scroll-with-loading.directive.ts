import {Directive, output, signal} from '@angular/core';

@Directive({
    selector: '[appScrollWithLoading]',
    standalone: true,
    host: {
        '(scroll)': 'onScroll($event)',
    },
})
export class ScrollWithLoadingDirective {
    private readonly scrollBottomThreshold: number = 100;
    private readonly previousScrollTop = signal<number>(0);

    loadNextData = output<void>();

    onScroll(event: MouseEvent): void {
        const {scrollHeight, scrollTop, clientHeight} = event.target as HTMLElement;
        const scrollBottom = scrollHeight - scrollTop - clientHeight;
        const isSmallScrollBottomRest = scrollBottom <= this.scrollBottomThreshold;
        const isScrollDirectionDown = scrollTop > this.previousScrollTop();

        // если для прокрутки вниз осталось меньшее 100px и список скроллится вниз,
        // тогда вызываем событие для подгрузки новых элементов
        if (isSmallScrollBottomRest && isScrollDirectionDown) {
            this.previousScrollTop.set(scrollTop);
            this.loadNextData.emit();
        }
    }
}
