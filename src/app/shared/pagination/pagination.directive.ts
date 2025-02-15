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
export class PaginationDirective<Data> {
    private readonly activeIndex = signal(0);

    viewContainerRef = inject(ViewContainerRef);
    templateRef = inject(TemplateRef);

    readonly appPaginationOf = input.required<Data[]>();
    readonly appPaginationChunkSize = input.required<number>();

    readonly start = computed(() => this.activeIndex() * this.appPaginationChunkSize());
    readonly end = computed(() => this.start() + this.appPaginationChunkSize());

    constructor() {
        effect(() => {
            this.viewContainerRef.clear();
            this.viewContainerRef.createEmbeddedView(this.templateRef, this.getCurrentContext());
        });
    }

    next() {
        this.activeIndex.update(index => (index + 1 < this.getTotalPages() ? index + 1 : index));
    }

    previous() {
        this.activeIndex.update(index => (index - 1 >= 0 ? index - 1 : index));
    }

    getTotalPages() {
        return Math.ceil(this.appPaginationOf().length / this.appPaginationChunkSize());
    }

    getCurrentContext(): PaginationContext<Data> {
        return {
            $implicit: this.appPaginationOf().slice(this.start(), this.end()),
            pageIndexes: Array.from(
                {
                    length: Math.ceil(
                        this.appPaginationOf().length / this.appPaginationChunkSize(),
                    ),
                },
                (_, i) => i + 1,
            ),
            activeIndex: this.activeIndex() + 1,
            selectIndex: (index: number) => this.activeIndex.set(index - 1),
            next: () => this.next(),
            back: () => this.previous(),
        };
    }
}
