import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {HeaderComponent} from './components/header/header.component';
import {ProductsListComponent} from './pages/products-list/products-list.component';
import {applicationConfigMock} from './shared/application-config/application-config.mock';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {InsetShadowDirective} from './shared/inset-shadow/inset-shadow.directive';
import {PopupHostComponent} from './components/popup-host/popup-host.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        HeaderComponent,
        ProductsListComponent,
        SidenavComponent,
        MatListModule,
        InsetShadowDirective,
        PopupHostComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    readonly applicationConfig = signal(applicationConfigMock);
}
