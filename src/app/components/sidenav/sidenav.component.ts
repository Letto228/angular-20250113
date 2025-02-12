import {ChangeDetectionStrategy, Component, model} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ProductsListComponent} from '../../pages/products-list/products-list.component';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [MatSidenavModule, MatButtonModule, ProductsListComponent],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
    readonly isSidenavOpened = model(false);

    toggleSidenavOpened() {
        this.isSidenavOpened.set(!this.isSidenavOpened());
    }
}
