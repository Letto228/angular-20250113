import {
    ChangeDetectionStrategy,
    Component,
    effect,
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
    readonly popupHostViewport = viewChild('popupHostViewport', {
        read: ViewContainerRef,
    });

    readonly popupHostTemplate = input<TemplateRef<unknown> | null>(); // 1:48:36

    constructor() {
        effect(() => {
            const contentTemplateLocal = this.popupHostTemplate();

            // eslint-disable-next-line no-console
            console.log(contentTemplateLocal);

            this.popupHostViewport()?.clear();

            if (contentTemplateLocal) {
                this.popupHostViewport()?.createEmbeddedView(contentTemplateLocal);
            }
        });
    }
}
