import {Injectable, signal, TemplateRef} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private readonly templateStore = signal<TemplateRef<unknown> | null>(null);
    private readonly contextStore = signal<string | null>(null);

    getPopup(): TemplateRef<unknown> | null {
        return this.templateStore();
    }

    getContext(): string | null {
        return this.contextStore();
    }

    openPopup(template: TemplateRef<unknown> | null, context: string = 'default context') {
        this.templateStore.set(template);
        this.contextStore.set(context);
    }

    closePopup() {
        this.templateStore.set(null);
    }
}
