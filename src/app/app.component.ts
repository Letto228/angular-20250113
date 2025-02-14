import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {HeaderComponent} from './components/header/header.component';
import {ProductsListComponent} from './pages/products-list/products-list.component';
import {applicationConfigMock} from './shared/application-config/application-config.mock';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {InsetShadowDirective} from './shared/inset-shadow/inset-shadow.directive';
import {Product} from './shared/products/product.interface';
import {productsMock} from './shared/products/products.mock';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        HeaderComponent,
        ProductsListComponent,
        SidenavComponent,
        MatListModule,
        InsetShadowDirective,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    readonly applicationConfig = signal(applicationConfigMock);
    readonly tmpProducts: Product[] = [
        productsMock[5],
        productsMock[6],
        productsMock[7],
        productsMock[8],
    ];

    doProductsLoad(event: Event) {
        // eslint-disable-next-line no-debugger
        debugger;
        this.tmpProducts?.push(productsMock[0]);
        this.tmpProducts?.push(productsMock[1]);
        this.tmpProducts?.push(productsMock[2]);

        // eslint-disable-next-line no-console
        console.log(event);
    }
}
