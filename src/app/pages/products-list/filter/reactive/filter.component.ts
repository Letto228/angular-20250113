import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, effect, input} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
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
        ReactiveFormsModule,
    ],
})
export class FilterComponent {
    brands = input<string[] | null>(null);

    readonly counterForm = new FormControl();
    readonly textControl = new FormControl('Test');

    readonly form = new FormGroup({
        search: new FormControl(''),
        brands: new FormArray<FormControl<boolean>>([]),
        priceRange: new FormGroup({
            min: new FormControl(0),
            max: new FormControl(999999),
        }),
    });

    constructor() {
        //     this.counterForm.setValue(10);
        //     setTimeout(() => {
        //         this.counterForm.setValue(140);
        //     }, 1000);

        //     this.counterForm.valueChanges.subscribe(console.log);
        this.listenBrandsChange();
        // this.form.reset();
        // this.form.patchValue({});

        // this.form.valueChanges
        //     .pipe(
        //         map(formValue => ({
        //             ...formValue,
        //             brands: this.brands()?.filter((_brand, index) => formValue.brands?.[index]),
        //         })),
        //     )
        //     .subscribe(console.log);

        // eslint-disable-next-line no-console
        this.form.get('search')?.valueChanges.subscribe(console.log);
    }

    listenBrandsChange() {
        effect(() => {
            const brandsControls = this.brands()?.map(() => new FormControl(false)) || [];
            const brandsForm = new FormArray(brandsControls as Array<FormControl<boolean>>);

            this.form.setControl('brands', brandsForm);
        });
    }
}
