import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, input, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-counter-input',
    templateUrl: './counter-input.component.html',
    styleUrls: ['./counter-input.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            // eslint-disable-next-line no-use-before-define
            useExisting: CounterInputComponent,
        },
    ],
})
export class CounterInputComponent implements ControlValueAccessor {
    readonly step = input(1);

    readonly counter = signal(0);
    readonly isDisabled = signal(false);

    // constructor() {
    //     effect(() => {
    //         this.onChangeCallback(this.counter());
    //     });
    // }

    onChangeCallback = (_counter: number): void => {
        throw new Error('onChangeCallback не зарегестрирован');
    };

    onTouchedCallback = (): void => {
        throw new Error('onTouchedCallback не зарегестрирован');
    };

    writeValue(counter: number): void {
        // eslint-disable-next-line no-console
        console.log(`New value: ${counter}`);
        this.counter.set(counter);
    }

    registerOnChange(onChangeCallback: (counter: number) => void): void {
        this.onChangeCallback = onChangeCallback;
    }

    registerOnTouched(onTouchedCallback: () => void): void {
        this.onTouchedCallback = onTouchedCallback;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled.set(isDisabled);
    }

    back(): void {
        this.counter.update(counter => counter - this.step());

        // eslint-disable-next-line no-console
        console.log(`onChangeCallback: ${this.counter()}`);

        this.onChangeCallback(this.counter());
        this.onTouchedCallback();
    }

    next(): void {
        this.counter.update(counter => counter + this.step());

        // eslint-disable-next-line no-console
        console.log(`onChangeCallback: ${this.counter()}`);

        this.onChangeCallback(this.counter());
        this.onTouchedCallback();
    }
}
