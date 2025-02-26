import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgTemplateOutlet} from '@angular/common';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    standalone: true,
    imports: [MatIcon, NgTemplateOutlet],
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    private readonly popupService = inject(PopupService);

    readonly templateData = computed(() => this.popupService.tenplateData());

    onClose() {
        this.popupService.closePopup();
    }
}
