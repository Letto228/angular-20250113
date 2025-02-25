import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {applicationConfigMock} from './shared/application-config/application-config.mock';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {InsetShadowDirective} from './shared/inset-shadow/inset-shadow.directive';
import {PopupHostComponent} from './components/popup-host/popup-host.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        HeaderComponent,
        SidenavComponent,
        MatListModule,
        InsetShadowDirective,
        PopupHostComponent,
        RouterOutlet,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    readonly applicationConfig = signal(applicationConfigMock);
}
