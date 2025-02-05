import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {HeaderComponent} from './components/header/header.component';
import {ProductsListComponent} from './pages/products-list/products-list.component';
import {applicationConfigMock} from './shared/application-config/application-config.mock';
import {SidenavComponent} from './components/sidenav/sidenav.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeaderComponent, ProductsListComponent, SidenavComponent, MatListModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    applicationConfig = applicationConfigMock;

    switchTemplate = signal(false);
    closeTemplate = signal(true);

    constructor() {
        setTimeout(() => {
            this.toggleTemplate();
        }, 3000);
        setTimeout(() => {
            this.toggleTemplate();
        }, 6000);
        setTimeout(() => {
            this.toggleTemplate();
        }, 9000);
    }

    private toggleTemplate() {
        this.switchTemplate.set(!this.switchTemplate());
        // or
        this.closeTemplate.set(!this.closeTemplate());
    }
}
