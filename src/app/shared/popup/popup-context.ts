import {TemplateRef} from '@angular/core';

export interface PopupData<TContext> {
    template: TemplateRef<TContext>;
    context: TContext;
}
