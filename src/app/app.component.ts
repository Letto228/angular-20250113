import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {applicationConfigMock} from './shared/application-config/application-config.mock';
import {SidenavComponent} from './components/sidenav/sidenav.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeaderComponent, SidenavComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    readonly isSidenavOpenedStore = signal(false);

    applicationConfig = applicationConfigMock;

    onMenuClick() {
        this.isSidenavOpenedStore.update(isSidenavOpened => !isSidenavOpened);
    }
}
