import {ChangeDetectionStrategy, Component, inject, viewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {CategoriesSelectComponent} from './categories-select/categories-select.component';
import {CategoriesStoreService} from '../../shared/categories/categories-store.service';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [MatSidenavModule, MatButtonModule, CategoriesSelectComponent],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
    private readonly matDrawer = viewChild.required<MatDrawer>(MatDrawer);

    private readonly categoriesStoreService = inject(CategoriesStoreService);

    constructor() {
        this.categoriesStoreService.loadCategories();
    }

    getCategories(): ReturnType<CategoriesStoreService['getCategories']> {
        return this.categoriesStoreService.getCategories();
    }

    toggleSidenavOpened() {
        this.matDrawer().toggle();
    }
}
