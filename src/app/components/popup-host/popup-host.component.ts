import {
    ChangeDetectionStrategy,
    Component,
    inject,
    computed,
    type TemplateRef,
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgTemplateOutlet} from '@angular/common';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
    selector: 'app-popup-host',
    standalone: true,
    imports: [MatButtonModule, MatIconModule, NgTemplateOutlet],
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    readonly popupService = inject(PopupService);

    readonly template = computed<TemplateRef<{$implicit: string}> | null>(
        () => this.popupService.popupContent()?.template ?? null,
    );

    readonly context = computed<{$implicit: string} | undefined>(
        () => this.popupService.popupContent()?.context,
    );
}
