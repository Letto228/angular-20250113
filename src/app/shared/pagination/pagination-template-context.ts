export interface PaginationTemplateContext<Item> {
    $implicit: Item[];
    index: number;
    pageIndexes: number[];
    isStartIndex: boolean;
    isLastIndex: boolean;
    back: () => void;
    next: () => void;
    selectIndex: (index: number) => void;
}
