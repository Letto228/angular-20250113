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

    readonly appPaginationOf = input<Data[]>([]);
    readonly appPaginationChunkSize = input(4);

    readonly activeIndex = signal(0);
    readonly productsGroup = computed(() =>
        [...this.appPaginationOf()].splice(
            this.activeIndex() * this.appPaginationChunkSize(),
            this.appPaginationChunkSize(),
        ),
    );

    readonly totalPages = computed(() =>
        Math.abs(this.appPaginationOf().length / this.appPaginationChunkSize()),
    );

    readonly pageIndexes = computed(() => {
        const indexes = [];

        for (let i = 0; i < this.totalPages(); i++) {
            indexes.push(i);
        }

        return indexes;
    });

    readonly hasNext = computed(() => {
        return this.activeIndex() < this.pageIndexes().length - 1;
    });

    readonly hasPrev = computed(() => {
        return this.activeIndex() > 0;
    });

    constructor() {
        // TODO: Reset current index by appCarouselOf change
        this.listenCurrentItem();
    }

    private listenCurrentItem() {
        effect(() => {
            this.viewContainerRef.clear();
            this.viewContainerRef.createEmbeddedView(this.templateRef, this.getCurrentContext());
        });
    }

    private getCurrentContext(): PaginationContext<Data> {
        return {
            $implicit: this.productsGroup(),
            appPaginationChunkSize: this.appPaginationChunkSize(),
            appPaginationOf: this.appPaginationOf(),
            productsGroup: this.productsGroup(),
            pageIndexes: this.pageIndexes(),
            activeIndex: this.activeIndex(),
            hasNext: this.hasNext(),
            hasPrev: this.hasPrev(),
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
            selectIndex: (index: number) => {
                this.selectIndex(index);
            },
        };
    }

    private next() {
        if (this.hasNext()) {
            this.activeIndex.update(prevIndex => prevIndex + 1);
        }
    }

    private back() {
        if (this.hasPrev()) {
            this.activeIndex.update(prevIndex => prevIndex - 1);
        }
    }

    private selectIndex(index: number) {
        this.activeIndex.set(index);
    }
}
