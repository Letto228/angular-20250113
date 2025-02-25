export interface PaginationContext<Data> {
    $implicit: Data[];
    pageIndexes: number[];
    activePage: number;
    selectPage: (index: number) => void;
    next: () => void;
    back: () => void;
}
