import {Component, ViewEncapsulation} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';

@Component({
    selector: 'app-root',
    // selector: 'div#root',
    standalone: true,
    imports: [HeaderComponent],
    templateUrl: './app.component.html',
    // template: '<h1>Hello</h1>',
    styleUrl: './app.component.css',
    // styleUrls: ['./app.component.css'],
    // styles: [''],
    encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent {
    title = 'angular-20250113';
}
