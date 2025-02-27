import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    output,
    TemplateRef,
} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ApplicationConfig} from '../../shared/application-config/application-config.interface';
import {PopupService} from '../../shared/popup/popup.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatButtonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    readonly popupService = inject(PopupService);
    readonly config = input.required<ApplicationConfig>();

    readonly menuClick = output();

    openPopup(_template: TemplateRef<unknown>) {
        this.popupService.openPopup(_template, this.config().title);
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
