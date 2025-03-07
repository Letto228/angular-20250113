import {
    computed,
    Directive,
    effect,
    inject,
    input,
    signal,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {PaginationContext} from './pagination-context';

@Directive({
    selector: '[appPagination]',
    standalone: true,
})
export class PaginationDirective<T> {
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly templateRef = inject<TemplateRef<PaginationContext<T>>>(TemplateRef);

    readonly appPaginationOf = input.required<T[]>();
    readonly appPaginationChunkSize = input<number>(4);
    readonly activeIndex = signal(0);
    readonly groupsCount = computed(() => {
        const itemsLength = this.appPaginationOf().length;
        const chunkSize = this.appPaginationChunkSize();

        return Math.ceil(itemsLength / chunkSize);
    });

    readonly pageIndexes = computed(() => {
        return Array.from({length: this.groupsCount()}, (_, i) => i++);
    });

    constructor() {
        this.listenPaginationState();
    }

    private listenPaginationState() {
        effect(() => {
            this.viewContainerRef.clear();

            const allItems = this.appPaginationOf();
            const chunkSize = this.appPaginationChunkSize();
            const activeIndex = this.activeIndex();
            const filteredItems = allItems.slice(
                chunkSize * activeIndex,
                chunkSize * (activeIndex + 1),
            );

            this.viewContainerRef.createEmbeddedView(this.templateRef, {
                $implicit: filteredItems,
                pageIndexes: this.pageIndexes(),
                activeIndex,
                changeActiveItem: this.changeActiveItem.bind(this),
                next: this.next.bind(this),
                back: this.back.bind(this),
            });
        });
    }

    private changeActiveItem(index: number) {
        this.activeIndex.set(index);
    }

    private back() {
        const newIndex = this.activeIndex() > 0 ? this.activeIndex() - 1 : this.groupsCount() - 1;

        this.changeActiveItem(newIndex);
    }

    private next() {
        const newIndex = this.activeIndex() + 1 >= this.groupsCount() ? 0 : this.activeIndex() + 1;

        this.changeActiveItem(newIndex);
    }
}
