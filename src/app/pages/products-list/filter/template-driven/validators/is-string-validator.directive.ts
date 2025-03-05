import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
    selector: '[appIsStringValidator]',
    standalone: true,
    providers: [
        {
            provide: NG_VALIDATORS,
            multi: true,
            // eslint-disable-next-line no-use-before-define
            useExisting: IsStringValidatorDirective,
        },
    ],
})
export class IsStringValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        // console.log('isStringValidator call');

        return Number(control.value) ? {isString: 'Input value convert to number'} : null;
    }
}
