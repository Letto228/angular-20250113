import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {ProductsListComponent} from './pages/products-list/products-list.component';
import {applicationConfigMock} from './shared/application-config/application-config.mock';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {ApplicationConfig} from './shared/application-config/application-config.interface';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeaderComponent, ProductsListComponent, SidenavComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    private readonly cd = inject(ChangeDetectorRef);

    readonly isSidenavOpenedStore = signal(false);

    applicationConfig = applicationConfigMock;

    constructor() {
        setTimeout(() => {
            this.applicationConfig = {
                ...this.applicationConfig,
                title: 'My appp',
            };

            this.cd.markForCheck();
        }, 5000);
    }

    onMenuClick(event: ApplicationConfig) {
        // eslint-disable-next-line no-console
        console.log(event);

        this.isSidenavOpenedStore.update(isSidenavOpened => !isSidenavOpened);
    }
}
