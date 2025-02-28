import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    effect,
    inject,
    input,
    TemplateRef,
    viewChild,
    ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    standalone: true,
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.opened]': 'isOpened',
    },
})
export class PopupHostComponent {
    private readonly containerRef = viewChild.required('containerRef', {read: ViewContainerRef});
    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    readonly template = input.required<TemplateRef<unknown> | null>();

    isOpened = true;

    constructor() {
        effect(() => {
            this.containerRef().clear();

            const template = this.template();

            if (!template) {
                this.close();

                return;
            }

            this.containerRef().createEmbeddedView(template);
            this.open();
        });
    }

    onCloseClick() {
        this.close();
    }

    close() {
        this.isOpened = false;
        this.changeDetectorRef.markForCheck();
    }

    open() {
        this.isOpened = true;
        this.changeDetectorRef.markForCheck();
    }
}
