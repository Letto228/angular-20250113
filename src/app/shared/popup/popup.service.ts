import {Injectable, signal} from '@angular/core';
import {PopupContent} from './popup-content.type';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    private readonly popupTemplateOptionsStore = signal<PopupContent<object> | null>(null);

    getPopupTemplateOptions(): PopupContent<object> | null {
        return this.popupTemplateOptionsStore();
    }

    openPopup<Context extends object>(popupContent: PopupContent<Context>) {
        this.popupTemplateOptionsStore.set(popupContent);
    }

    closePopup() {
        this.popupTemplateOptionsStore.set(null);
    }
}
