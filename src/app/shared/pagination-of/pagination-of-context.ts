export interface PaginationOfContext<Data> {
    $implicit: Data[];
    pageIndexes: number[];
    index: number;
    next: () => void;
    back: () => void;
    selectIndex: (index: number) => void;
}
