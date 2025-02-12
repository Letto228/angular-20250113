export interface PaginationTemplateContext<Item> {
    $implicit: Item[];
    index: number;
    pageIndexes: number[];
    back: () => void;
    next: () => void;
    selectIndex: (index: number) => void;
}
