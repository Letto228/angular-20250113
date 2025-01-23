import {Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatButtonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    // readonly imageSrc = '../../../../../public/favicon.ico';
    readonly imageSrc = 'https://s0.rbk.ru/v6_top_pics/media/img/1/04/756529824000041.jpg';

    onClick(event: Event) {
        // eslint-disable-next-line no-console
        console.log('Clicked', event);
        event.stopPropagation();
    }

    onKeyDown(event: Event) {
        // eslint-disable-next-line no-console
        console.log(event);
    }
}
