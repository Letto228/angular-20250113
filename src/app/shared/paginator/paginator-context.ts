export interface PaginatorContext<Data> {
    $implicit: Data;
    index: number;
    indexItems: Data[];
    itemsPerPage: number;
    pageCount: number;
    pageNumbers: number[];
    appCaurouselOf: Data[];
    next: () => void;
    back: () => void;
    select: (index: number) => void;
}
