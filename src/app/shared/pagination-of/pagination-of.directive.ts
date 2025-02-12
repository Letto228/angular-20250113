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
import {PaginationOfContext} from './pagination-of-context';

@Directive({
    selector: '[appPaginationOf]',
    standalone: true,
})
export class PaginationOfDirective<Data> {
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly templateRef = inject<TemplateRef<PaginationOfContext<Data>>>(TemplateRef);
    private readonly index = signal<number>(1);
    private readonly pageIndexes = computed<number[]>(() => {
        const length = this.appPaginationOf().length;
        const countPages = Math.ceil(length / this.appPaginationChunkSize());

        return [...new Array(countPages).keys()].map(i => i + 1);
    });

    private readonly group = computed<Data[]>(() => {
        const appPaginationChunkSize = this.appPaginationChunkSize();
        const startGroup = (this.index() - 1) * appPaginationChunkSize;

        return this.appPaginationOf().slice(startGroup, startGroup + appPaginationChunkSize);
    });

    readonly appPaginationOf = input.required<Data[]>();
    readonly appPaginationChunkSize = input(1);

    constructor() {
        effect(() => {
            this.viewContainerRef.clear();
            this.viewContainerRef.createEmbeddedView(this.templateRef, this.getCurrentContext());
        });
    }

    private getCurrentContext(): PaginationOfContext<Data> {
        return {
            $implicit: this.group(),
            pageIndexes: this.pageIndexes(),
            index: this.index(),
            next: this.next.bind(this),
            back: this.back.bind(this),
            selectIndex: this.selectIndex.bind(this),
        };
    }

    private next() {
        if (this.pageIndexes().length < 2) {
            return;
        }

        this.index.update(index => {
            const pageIndexes = this.pageIndexes();
            const indexPositon = pageIndexes.indexOf(index);

            return indexPositon >= pageIndexes.length - 1 ? index : pageIndexes[indexPositon + 1];
        });
    }

    private back() {
        if (this.pageIndexes().length < 2) {
            return;
        }

        this.index.update(index => {
            const pageIndexes = this.pageIndexes();
            const indexPositon = pageIndexes.indexOf(index);

            return indexPositon < 1 ? index : pageIndexes[indexPositon - 1];
        });
    }

    private selectIndex(index: number) {
        if (!this.pageIndexes().some(x => x === index)) {
            return;
        }

        this.index.set(index);
    }
}
