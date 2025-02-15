export interface PaginationContext<Data> {
    $implicit: Data[];
    pageIndexes: number[];
    activeIndex: number;
    selectIndex: (index: number) => void;
    next: () => void;
    back: () => void;
}
