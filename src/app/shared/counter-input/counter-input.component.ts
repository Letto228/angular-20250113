import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, input, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-counter-input',
    templateUrl: './counter-input.component.html',
    styleUrls: ['./counter-input.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class CounterInputComponent {
    readonly step = input(1);

    readonly counter = signal(0);

    back() {
        this.counter.update(counter => counter - this.step());
    }

    next() {
        this.counter.update(counter => counter + this.step());
    }
}
