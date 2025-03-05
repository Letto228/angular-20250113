import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {RouterOutlet} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {HeaderComponent} from './components/header/header.component';
import {applicationConfigMock} from './shared/application-config/application-config.mock';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {InsetShadowDirective} from './shared/inset-shadow/inset-shadow.directive';
import {PopupHostComponent} from './components/popup-host/popup-host.component';
import {State} from './store/state';

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

    constructor() {
        inject<Store<State>>(Store)
            .pipe(
                // map(({products}) => products.currentProductId),
                // distinctUntilChanged(),
                select(({products}) => products.currentProductId),
            )
            // eslint-disable-next-line no-console
            .subscribe(console.log);
    }
}
