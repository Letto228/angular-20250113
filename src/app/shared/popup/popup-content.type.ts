import {TemplateRef} from '@angular/core';

export type PopupContent<T extends object> = {
    template: TemplateRef<T>;
    context: T;
};
