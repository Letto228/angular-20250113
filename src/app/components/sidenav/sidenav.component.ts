import {ChangeDetectionStrategy, Component, viewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [MatSidenavModule, MatButtonModule],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
    private readonly matDrawer = viewChild.required<MatDrawer>(MatDrawer);

    toggleSidenavOpened() {
        this.matDrawer().toggle();
    }
}
