import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule} from '@angular/forms';
import {CounterInputComponent} from '../../../../shared/counter-input/counter-input.component';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        MatInputModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        CounterInputComponent,
        FormsModule,
    ],
})
export class FilterComponent {
    brands = input<string[] | null>(null);
}
