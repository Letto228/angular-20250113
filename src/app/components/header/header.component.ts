import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ApplicationConfig} from '../../shared/application-config/application-config.interface';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatButtonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    // readonly config = input<ApplicationConfig | undefined, ApplicationConfig | undefined>(
    //     undefined,
    //     {
    //         transform: (value: ApplicationConfig | undefined): ApplicationConfig | undefined => {
    //             console.log(value);

    //             return value;
    //         },
    //     },
    // );
    // @Input() config: ApplicationConfig | null = null;
    // readonly config = input<ApplicationConfig | null>(null);
    // readonly config: InputSignal<ApplicationConfig> = input.required();
    readonly config = input.required<ApplicationConfig>();

    readonly menuClick = output<ApplicationConfig>();

    // readonly imageSrc = 'favicon.ico';
}
