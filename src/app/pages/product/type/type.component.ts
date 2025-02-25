import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-type',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './type.component.html',
    styleUrl: './type.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeComponent {}
