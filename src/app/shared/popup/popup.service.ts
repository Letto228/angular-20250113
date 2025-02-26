import {Injectable, signal} from '@angular/core';
import {PopupData} from './popup-context';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    readonly popupData = signal<PopupData<unknown> | null>(null);

    openPopup<TContext = unknown>(templateData: PopupData<TContext>) {
        this.popupData.set(templateData);
    }

    closePopup() {
        this.popupData.set(null);
    }

    getPopupData() {
        return this.popupData();
    }
}
