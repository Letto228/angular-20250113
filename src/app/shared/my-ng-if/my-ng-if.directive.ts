import {Directive, effect, inject, input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appMyNgIf]',
    standalone: true,
})
export class MyNgIfDirective<Value> {
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly templateRef = inject(TemplateRef);

    readonly appMyNgIf = input<null | undefined | Value>();

    constructor() {
        effect(() => {
            const isValueDefined = Boolean(this.appMyNgIf());
            const isContainerhasView = Boolean(this.viewContainerRef.length);

            if (!isValueDefined) {
                this.viewContainerRef.clear();

                return;
            }

            if (isContainerhasView) {
                this.viewContainerRef.clear();
            }

            this.viewContainerRef.createEmbeddedView(this.templateRef, {
                $implicit: this.appMyNgIf(),
                appMyNgIf: this.appMyNgIf(),
            });
        });
    }
}
