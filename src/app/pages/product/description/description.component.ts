import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-description',
    standalone: true,
    imports: [],
    templateUrl: './description.component.html',
    styleUrl: './description.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionComponent {}
