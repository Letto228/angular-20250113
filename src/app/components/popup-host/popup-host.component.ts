import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    input,
    TemplateRef,
    viewChild,
    ViewContainerRef,
} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-popup-host',
    standalone: true,
    imports: [NgClass],
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    readonly template = input.required<TemplateRef<unknown> | null>();

    readonly contentViewport = viewChild.required('popupTemplate', {read: ViewContainerRef});
    isPopup = computed(() => this.template() !== null);
    templateSignal = computed(() => this.template());

    constructor() {
        effect(() => {
            const contentTemplate = this.templateSignal();

            this.contentViewport().clear();

            if (contentTemplate) {
                this.contentViewport().createEmbeddedView(contentTemplate);
            }
        });
    }
}
