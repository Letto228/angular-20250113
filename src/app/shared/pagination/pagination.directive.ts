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
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly templateRef = inject<TemplateRef<PaginationContext<Data>>>(TemplateRef);

    private readonly activeIndex = signal(1);
    readonly appPaginationOf = input.required<Data[]>();
    readonly appPaginationChunkSize = input.required<number>();

    readonly productsGroup = computed<Data[]>(() =>
        this.appPaginationOf().slice(
            (this.activeIndex() - 1) * this.appPaginationChunkSize(),
            this.activeIndex() * this.appPaginationChunkSize(),
        ),
    );

    readonly pageIndexes = computed<number[]>(() =>
        Array.from(
            {
                length: Math.ceil(this.appPaginationOf().length / this.appPaginationChunkSize()),
            },
            (_, i) => i + 1,
        ),
    );

    constructor() {
        this.listenCurrentChunk();
    }

    private listenCurrentChunk() {
        effect(() => {
            this.viewContainerRef.clear();
            this.viewContainerRef.createEmbeddedView(this.templateRef, this.getCurrentContext());
        });
    }

    private getCurrentContext(): PaginationContext<Data> {
        return {
            $implicit: this.productsGroup(),
            activeIndex: this.activeIndex(),
            pageIndexes: this.pageIndexes(),
            appPaginationOf: this.appPaginationOf(),
            back: () => this.back(),
            next: () => this.next(),
            selectIndex: (index: number) => this.selectIndex(index),
        };
    }

    private next() {
        const nextIndex = this.activeIndex() + 1;
        const newIndex = nextIndex <= this.pageIndexes().length ? nextIndex : 1;

        this.activeIndex.set(newIndex);
    }

    private back() {
        const previousIndex = this.activeIndex() - 1;
        const newIndex = previousIndex > 0 ? previousIndex : this.pageIndexes().length;

        this.activeIndex.set(newIndex);
    }

    private selectIndex(index: number) {
        this.activeIndex.set(index);
    }
}
