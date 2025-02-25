import {Injectable, signal} from '@angular/core';
import type {TemplateRef} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    readonly popupContent = signal<{
        template: TemplateRef<{$implicit: string}>;
        context: {$implicit: string};
    } | null>(null);

    openPopup(template: TemplateRef<{$implicit: string}>, context: {$implicit: string}) {
        this.popupContent.set({
            template,
            context,
        });
    }

    closePopup() {
        this.popupContent.set(null);
    }
}
