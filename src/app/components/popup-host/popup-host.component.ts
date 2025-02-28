import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    standalone: true,
    imports: [MatIconButton, NgTemplateOutlet],
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    private readonly popupService = inject(PopupService);

    getPopupData() {
        return this.popupService.getPopupData();
    }

    close() {
        this.popupService.closePopup();
    }
}
