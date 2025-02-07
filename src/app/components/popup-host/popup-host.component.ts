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
    private readonly contentViewport = viewChild.required('contentViewport', {
        read: ViewContainerRef,
    });

    readonly template = input<TemplateRef<unknown> | null>();

    constructor() {
        effect(() => {
            const template = this.template();

            if (template) {
                this.contentViewport().clear();
                this.contentViewport().createEmbeddedView(template);
            }
        });
    }
}
