import {CommonModule} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    effect,
    input,
    TemplateRef,
    viewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
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
