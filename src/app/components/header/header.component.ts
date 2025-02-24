import {ChangeDetectionStrategy, Component, input, output, TemplateRef} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ApplicationConfig} from '../../shared/application-config/application-config.interface';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatButtonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    readonly config = input.required<ApplicationConfig>();

    readonly menuClick = output();

    openPopup(_template: TemplateRef<{$implicit: string}>) {
        // this.popupService.openPopup(template, context);
    }

    closePopup() {
        // this.popupService.closePopup();
    }
}
