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
    private readonly vcRef = inject(ViewContainerRef);
    private readonly templateRef = inject<TemplateRef<PaginationContext<T>>>(TemplateRef);

    readonly appPaginationOf = input.required<T[]>();
    readonly appPaginationChunkSize = input.required<number>();
    readonly activeIndex = signal(0);
    readonly groupsCount = computed(() => {
        const itemsLength = this.appPaginationOf().length;
        const chunkSize = this.appPaginationChunkSize();

        return Math.ceil(itemsLength / chunkSize);
    });

    constructor() {
        this.listenPaginationState();
    }

    private listenPaginationState() {
        effect(() => {
            this.vcRef.clear();

            const allItems = this.appPaginationOf();
            const groupsCount = this.groupsCount();
            const chunkSize = this.appPaginationChunkSize();
            const activeIndex = this.activeIndex();
            const pageIndexes = Array.from({length: groupsCount}, (_, i) => i++);
            const currentItems = allItems.filter((_, index) => {
                return index >= chunkSize * activeIndex && index < chunkSize * (activeIndex + 1);
            });

            this.vcRef.createEmbeddedView(this.templateRef, {
                $implicit: currentItems,
                pageIndexes,
                activeIndex,
                changeActiveItem: this.changeActiveItem.bind(this),
            });
        });
    }

    private changeActiveItem(index: number) {
        const groupsCount = this.groupsCount();

        if (index < 0) {
            this.activeIndex.set(groupsCount - 1);
        } else if (index >= groupsCount) {
            this.activeIndex.set(0);
        } else {
            this.activeIndex.set(index);
        }
    }
}
