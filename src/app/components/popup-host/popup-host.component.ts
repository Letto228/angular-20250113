import {NgIf} from '@angular/common';
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
    imports: [NgIf],
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    get isHidden(): boolean {
        return !this.template();
    }

    private readonly contentViewPort = viewChild.required<string, ViewContainerRef>(
        'contentViewPort',
        {
            read: ViewContainerRef,
        },
    );

    template = input<TemplateRef<unknown> | null>();

    constructor() {
        effect(() => {
            this.contentViewPort().clear();
            const contentTemplate = this.template();

            if (contentTemplate) {
                this.contentViewPort().createEmbeddedView(contentTemplate);
            }
        });
    }
}
