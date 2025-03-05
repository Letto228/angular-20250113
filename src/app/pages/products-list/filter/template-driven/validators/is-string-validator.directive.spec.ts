import {FormControl, FormsModule, NgModel} from '@angular/forms';
import {Component, viewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IsStringValidatorDirective} from './is-string-validator.directive';

describe('IsStringValidatorDirective', () => {
    let directive: IsStringValidatorDirective;

    beforeEach(() => {
        directive = new IsStringValidatorDirective();
    });

    it('String', () => {
        const error = directive.validate(new FormControl('String'));

        // expect(error).toEqual(null);
        expect(error).toBeNull();
    });

    it('should create an instance', () => {
        const error = directive.validate(new FormControl('123'));

        expect(error).toEqual({isString: 'Input value convert to number'});
    });
});

@Component({
    selector: 'app-test',
    template: `
        <input #input appIsStringValidator [ngModel]="search" />
    `,
    standalone: true,
    imports: [FormsModule, IsStringValidatorDirective],
})
class TestComponent {
    readonly model = viewChild.required('input', {read: NgModel});

    search = '123';
}

describe('IsStringValidatorDirective TestBed', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    // it('Number', fakeAsync(() => {
    //     fixture.detectChanges();

    //     // tick(100);
    //     flush();

    //     const error = component.model().errors;

    //     expect(error).toEqual({isString: 'Input value convert to number'});
    // }));

    it('Number', async () => {
        fixture.detectChanges();

        await fixture.whenStable();

        const error = component.model().errors;

        expect(error).toEqual({isString: 'Input value convert to number'});
    });
});
