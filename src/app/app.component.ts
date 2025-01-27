import {Component} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {ProductsListComponent} from './pages/products-list/products-list.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeaderComponent, ProductsListComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {}
