export interface PaginationContext<TValue> {
    $implicit: TValue[];
    pageIndexes: number[];
    activeIndex: number;
    changeActiveItem: (index: number) => void;
    back: () => void;
    next: () => void;
}
