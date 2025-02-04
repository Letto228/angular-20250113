import {
    ChangeDetectionStrategy,
    Component,
    input,
    effect,
    viewChild,
    ViewContainerRef,
} from '@angular/core';
import type {TemplateRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    standalone: true,
    imports: [],
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    template = input<TemplateRef<Element> | null>();
    templateContainer = viewChild<ViewContainerRef, ViewContainerRef>('templateContainer', {
        read: ViewContainerRef,
    });

    constructor() {
        effect(() => {
            const container = this.templateContainer();
            const template = this.template();

            // если контейнер не найден - до свидания
            if (!container) {
                return;
            }

            // очищаем view контейнера, если он не пустой
            if (container.length) {
                container.clear();
            }

            // если передан новый шаблон - устанавливаем его в контейнер
            if (template) {
                container.createEmbeddedView(template);
            }
        });
    }
}
