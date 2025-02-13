import {
    ChangeDetectionStrategy,
    Component,
    effect,
    ElementRef,
    inject,
    input,
    TemplateRef,
    viewChild,
    ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    standalone: true,
    imports: [],
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    private readonly containerRef = viewChild('containerRef', {read: ViewContainerRef});
    private readonly elementRef = inject(ElementRef);

    readonly template = input.required<TemplateRef<unknown> | null>();

    constructor() {
        effect(() => {
            this.containerRef()?.clear();

            const template = this.template();

            if (!template) {
                this.close();

                return;
            }

            this.containerRef()?.createEmbeddedView(template);
            this.open();
        });
    }

    onCloseClick() {
        this.close();
    }

    close() {
        this.elementRef.nativeElement.style.display = 'none';
    }

    open() {
        this.elementRef.nativeElement.style.display = 'flex';
    }
}
