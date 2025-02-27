import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgTemplateOutlet} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    standalone: true,
    imports: [MatIcon, MatButtonModule, NgTemplateOutlet],
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    readonly popupService = inject(PopupService);
}
