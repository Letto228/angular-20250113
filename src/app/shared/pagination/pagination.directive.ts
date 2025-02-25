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

    readonly appPaginationOf = input<Data[]>([]);
    readonly appPaginationChunkSize = input<number>(4);

    readonly start = computed(() => this.activeIndex() * this.appPaginationChunkSize());
    readonly end = computed(() => this.start() + this.appPaginationChunkSize());

    readonly arrayForIndexLength = computed(() =>
        Math.ceil(this.appPaginationOf().length / this.appPaginationChunkSize()),
    );

    readonly pageIndexes = computed(() =>
        [...new Array(this.arrayForIndexLength())].map((_, i) => i + 1),
    );

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
            pageIndexes: this.pageIndexes(),
            activePage: this.activeIndex() + 1,
            selectPage: (index: number) => this.activeIndex.set(index - 1),
            next: () => this.next(),
            back: () => this.previous(),
        };
    }
}
