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

    private readonly currentPageIndex = signal(0);

    private readonly currentPage = computed(() => {
        const pageFirstIndex = this.currentPageIndex() * this.appPaginationChunkSize();

        return this.appPaginationOf().slice(
            pageFirstIndex,
            pageFirstIndex + this.appPaginationChunkSize(),
        );
    });

    private readonly pagesCount = computed(() =>
        Math.ceil(this.appPaginationOf().length / this.appPaginationChunkSize()),
    );

    private readonly pageIndexes = computed(() => Array.from(new Array(this.pagesCount()).keys()));

    private readonly hasNext = computed(() => this.currentPageIndex() + 1 < this.pagesCount());
    private readonly hasPrev = computed(() => this.currentPageIndex() - 1 >= 0);

    readonly appPaginationOf = input.required<T[]>();
    readonly appPaginationChunkSize = input(10);

    constructor() {
        this.listenCurrentItem();
        this.listenAppPaginationInputs();
    }

    private listenAppPaginationInputs() {
        effect(
            () => {
                this.appPaginationOf();
                this.appPaginationChunkSize();

                // reset index if change one of inputs
                this.currentPageIndex.set(0);
            },
            {
                allowSignalWrites: true,
            },
        );
    }

    private listenCurrentItem() {
        effect(() => {
            this.viewContainerRef.clear();
            this.viewContainerRef.createEmbeddedView(this.templateRef, this.getCurrentContext());
        });
    }

    private getCurrentContext(): PaginationContext<T> {
        return {
            $implicit: this.currentPage(),
            index: this.currentPageIndex(),
            pageIndexes: this.pageIndexes(),
            appPaginationOf: this.appPaginationOf(),
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
        if (!this.hasNext()) {
            return;
        }

        this.currentPageIndex.update(currentIndex => currentIndex + 1);
    }

    private back() {
        if (!this.hasPrev()) {
            return;
        }

        this.currentPageIndex.update(currentIndex => currentIndex - 1);
    }

    private selectIndex(index: number) {
        if (index < 0 || index >= this.pagesCount()) {
            return;
        }

        this.currentPageIndex.set(index);
    }
}
