import {Injectable, signal, TemplateRef} from '@angular/core';

interface TemplateData {
    template: TemplateRef<unknown>;
    context: unknown;
}

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    readonly tenplateData = signal<TemplateData | null>(null);

    openPopup(template: TemplateRef<unknown>, context: unknown) {
        this.tenplateData.set({template, context});
    }

    closePopup() {
        this.tenplateData.set(null);
    }
}
