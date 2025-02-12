import {
    Directive,
    input,
    TemplateRef,
    ViewContainerRef,
    inject,
    effect,
    computed,
    signal,
} from '@angular/core';
import type {PaginationTemplateContext} from './pagination-template-context';

@Directive({
    selector: '[appPagination]',
    standalone: true,
})
export class PaginationDirective<Item> {
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly templateRef = inject(TemplateRef);

    private readonly currentPageIndex = signal<number>(0);

    private readonly pagesCount = computed<number>(() =>
        Math.ceil(this.appPaginationOf().length / this.appPaginationChunkSize()),
    );

    readonly appPaginationOf = input.required<Item[]>();
    readonly appPaginationChunkSize = input<number>(10); // 10 - число элементов на странице по умолчанию

    constructor() {
        this.listenForChanges();
    }

    // этот type guard нужен для типизации полей контекста в шаблоне
    static ngTemplateContextGuard<Item>(
        _: PaginationDirective<Item>,
        ctx: unknown,
    ): ctx is PaginationTemplateContext<Item> {
        return true;
    }

    listenForChanges(): void {
        effect(() => {
            if (this.viewContainerRef.length) {
                this.viewContainerRef.clear();
            }

            this.viewContainerRef.createEmbeddedView<PaginationTemplateContext<Item>>(
                this.templateRef,
                this.getTemplateContext(),
            );
        });
    }

    getTemplateContext(): PaginationTemplateContext<Item> {
        return {
            $implicit: this.getCurrentPageItemsGroup(),
            index: this.currentPageIndex(),
            pageIndexes: this.getPageIndexesArray(),
            back: () => this.back(),
            next: () => this.next(),
            selectIndex: (index: number) => this.selectIndex(index),
        };
    }

    getCurrentPageItemsGroup(): Item[] {
        const startIndex = this.currentPageIndex() * this.appPaginationChunkSize();
        const endIndex = startIndex + this.appPaginationChunkSize();

        return this.appPaginationOf().slice(startIndex, endIndex);
    }

    getPageIndexesArray(): number[] {
        return Array.from({length: this.pagesCount()}, (_, index) => index);
    }

    next(): void {
        // Если мы ещё не на последней странице - увеличиваем индекс
        if (this.currentPageIndex() < this.pagesCount() - 1) {
            this.currentPageIndex.update(currentIndex => currentIndex + 1);
        }
    }

    back(): void {
        // Если мы не на первой странице - уменьшаем индекс
        if (this.currentPageIndex() > 0) {
            this.currentPageIndex.update(currentIndex => currentIndex - 1);
        }
    }

    selectIndex(selectedIndex: number): void {
        // Если переданный индекс находится в диапазоне доступных индексов страниц - устанавливаем его
        if (this.getPageIndexesArray().includes(selectedIndex)) {
            this.currentPageIndex.set(selectedIndex);
        }
    }
}
