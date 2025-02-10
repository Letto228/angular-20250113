export interface CarouselContext<Data> {
    $implicit: Data;
    index: number;
    appCarouselOf: Data[];
    next: () => void;
    back: () => void;
}
