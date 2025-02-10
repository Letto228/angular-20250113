import {
    computed,
    Directive,
    effect,
    inject,
    input,
    signal,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {CarouselContext} from './carousel-context';

@Directive({
    selector: '[appCarousel]',
    standalone: true,
})
export class CarouselDirective<Data> {
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly templateRef = inject<TemplateRef<CarouselContext<Data>>>(TemplateRef);

    private readonly currentIndex = signal(0);

    readonly appCarouselOf = input.required<Data[]>();

    readonly currentItem = computed(() => this.appCarouselOf()[this.currentIndex()]);

    constructor() {
        // setInterval(() => {
        //     this.currentIndex.update(value => value + 1);
        // }, 2000);

        // Reset current index by appCarouselOf change
        this.listenCurrentItem();
    }

    private listenCurrentItem() {
        effect(() => {
            this.viewContainerRef.clear();
            this.viewContainerRef.createEmbeddedView(this.templateRef, this.getCurrentContext());
        });
    }

    private getCurrentContext(): CarouselContext<Data> {
        return {
            $implicit: this.currentItem(),
            index: this.currentIndex(),
            appCarouselOf: this.appCarouselOf(),
            next: this.next.bind(this),
            back: () => {
                this.back();
            },
        };
    }

    private next() {
        // const nextIndex = this.currentIndex() + 1;
        // const itemsLength = this.appCarouselOf().length;

        // const newIndex = nextIndex < itemsLength ? nextIndex : 0;

        // this.currentIndex.set(newIndex);

        this.currentIndex.update(currentIndex => {
            const nextIndex = currentIndex + 1;
            const itemsLength = this.appCarouselOf().length;

            return nextIndex < itemsLength ? nextIndex : 0;
        });
    }

    private back() {
        this.currentIndex.update(currentIndex => {
            const previousIndex = currentIndex - 1;
            const itemsLength = this.appCarouselOf().length;

            return previousIndex >= 0 ? previousIndex : itemsLength - 1;
        });
    }
}
