import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {NgTemplateOutlet} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, NgTemplateOutlet],
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.empty]': '!getTemplateOptions()?.template',
    },
})
export class PopupHostComponent {
    private readonly popupService = inject(PopupService);

    getTemplateOptions(): ReturnType<PopupService['getPopupTemplateOptions']> {
        return this.popupService.getPopupTemplateOptions();
    }

    onPopupClose() {
        this.popupService.closePopup();
    }
}
