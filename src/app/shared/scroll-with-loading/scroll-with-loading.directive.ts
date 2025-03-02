import {Directive, output, signal} from '@angular/core';
import {scrollBottomThreshold} from './consts';

@Directive({
    selector: '[appScrollWithLoading]',
    standalone: true,
    host: {
        '(scroll)': 'onScroll($event)',
    },
})
export class ScrollWithLoadingDirective {
    private readonly previousScrollTop = signal<number>(0);

    readonly loadNextData = output<void>();

    onScroll(event: MouseEvent): void {
        const {scrollHeight, scrollTop, clientHeight} = event.target as HTMLElement;
        const scrollBottom = scrollHeight - scrollTop - clientHeight;
        const isSmallScrollBottomRest = scrollBottom <= scrollBottomThreshold;
        const isScrollDirectionDown = scrollTop > this.previousScrollTop();

        this.previousScrollTop.set(scrollTop);

        // если для прокрутки вниз осталось меньшее 100px и список скроллится вниз,
        // тогда вызываем событие для подгрузки новых элементов
        if (isSmallScrollBottomRest && isScrollDirectionDown) {
            this.loadNextData.emit();
        }
    }
}
