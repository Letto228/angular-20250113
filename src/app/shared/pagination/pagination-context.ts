export interface PaginationContext<TValue> {
    $implicit: TValue[];
    pageIndexes: number[];
    activeIndex: number;
    changeActiveItem: (index: number) => void;
}
