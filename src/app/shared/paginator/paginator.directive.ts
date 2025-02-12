/* eslint-disable @typescript-eslint/no-inferrable-types */
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
import {Data} from '@angular/router';
import {PaginatorContext} from './paginator-context';

@Directive({
    selector: '[appPaginator]',
    standalone: true,
})
export class PaginatorDirective {
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly templateRef = inject<TemplateRef<PaginatorContext<Data>>>(TemplateRef);

    readonly itemsPerPage = input.required<number>();

    readonly currentIndex = signal(0);
    readonly currentIndexItems = computed<Data[]>(() => {
        const result: Data[] = [];
        const skip: number = this.itemsPerPage() * this.currentIndex();
        const items: Data[] = this.appPaginatorOf();

        for (let i = skip; i < skip + this.itemsPerPage(); i++) {
            if (i >= 0 && i < items.length) {
                result.push(items[i]);
            }
        }

        return result;
    });

    readonly appPaginatorOf = input.required<Data[]>();
    readonly currentItem = computed(() => this.appPaginatorOf()[this.currentIndex()]);

    constructor() {
        effect(() => {
            const context = this.getCurrentContext(this.currentItem()); // this.currentItem();

            this.viewContainerRef.clear();
            this.viewContainerRef.createEmbeddedView(this.templateRef, context);
        });
    }

    getPageNumbers() {
        const pageCount = this.getPageCount();

        return Array.from({length: pageCount}, (_, i) => i + 1);
    }

    getPageCount() {
        return Math.ceil((this.appPaginatorOf()?.length ?? 0) / this.itemsPerPage());
    }

    private getCurrentContext(item: Data): PaginatorContext<Data> {
        return {
            $implicit: item,
            index: this.currentIndex(),
            indexItems: this.currentIndexItems(),
            itemsPerPage: this.itemsPerPage(),
            pageCount: this.getPageCount(),
            pageNumbers: this.getPageNumbers(),
            appCaurouselOf: this.appPaginatorOf(),
            next: () => {
                const nextIndex = this.currentIndex() + 1;
                const itemsLength = this.getPageCount();

                const newIndex = nextIndex < itemsLength ? nextIndex : itemsLength - 1;

                this.currentIndex.set(newIndex);
            },
            back: () => {
                const prevIndex = this.currentIndex() - 1;

                const newIndex = prevIndex >= 0 ? prevIndex : 0;

                this.currentIndex.set(newIndex);
            },
            select: (index: number) => {
                if (index >= 0 && index < this.getPageCount()) {
                    this.currentIndex.set(index);
                }
            },
        };
    }
}
