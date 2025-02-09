import {NgClass} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    input,
    effect,
    TemplateRef,
    viewChild,
    ViewContainerRef,
    computed,
    ElementRef,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    standalone: true,
    imports: [NgClass],
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

    private readonly container = viewChild.required('container', {
        read: ViewContainerRef,
    });

    readonly template = input<TemplateRef<unknown> | null>();

    openDialog = computed(() => !!this.template());

    constructor() {
        effect(() => {
            const tepmlate = this.template();
            const container = this.container();
            const dialog = this.dialog();

            if (container.get(0)) {
                container.clear();
            }

            if (tepmlate) {
                container.createEmbeddedView(tepmlate);
                dialog.nativeElement.showModal();
            } else {
                dialog.nativeElement.close();
            }
        });
    }
}
