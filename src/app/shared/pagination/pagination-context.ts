export interface PaginationContext<T> {
    $implicit: T[];
    index: number;
    pageIndexes: number[];
    appPaginationOf: T[];
    hasNext: boolean;
    hasPrev: boolean;
    next: () => void;
    back: () => void;
    selectIndex: (index: number) => void;
}
