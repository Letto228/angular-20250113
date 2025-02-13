export interface PaginationContext<Data> {
    $implicit: Data[];
    activeIndex: number;
    appPaginationOf: Data[];
    pageIndexes: number[];
    back: () => void;
    next: () => void;
    selectIndex: (index: number) => void;
}
