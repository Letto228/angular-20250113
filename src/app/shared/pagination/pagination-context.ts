export interface PaginationContext<Data> {
    $implicit: Data[];
    appPaginationOf: Data[];
    appPaginationChunkSize: number;
    productsGroup: Data[];
    pageIndexes: number[];
    activeIndex: number;
    hasNext: boolean;
    hasPrev: boolean;
    next: () => void;
    back: () => void;
    selectIndex: (index: number) => void;
}
