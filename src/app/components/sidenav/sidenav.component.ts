import {
    ChangeDetectionStrategy,
    Component,
    effect,
    input,
    TemplateRef,
    viewChild,
    ViewContainerRef,
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [MatSidenavModule, MatButtonModule],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
    private readonly matDrawer = viewChild.required<MatDrawer>(MatDrawer);
    private readonly navigationViewport = viewChild.required('navigationViewport', {
        read: ViewContainerRef,
    });

    private readonly contentViewport = viewChild.required('contentViewport', {
        read: ViewContainerRef,
    });

    readonly navigationTemplate = input<TemplateRef<unknown>>();
    readonly contentTemplate = input<TemplateRef<unknown>>();

    constructor() {
        effect(() => {
            const contentTemplate = this.contentTemplate();

            if (contentTemplate) {
                this.contentViewport().createEmbeddedView(contentTemplate);
            }
        });

        effect(() => {
            const navigationTemplate = this.navigationTemplate();

            if (navigationTemplate) {
                this.navigationViewport().createEmbeddedView(navigationTemplate, {
                    contextProperty: 'Moscow',
                    $implicit: 'Egor',
                });
            }
        });
    }

    toggleSidenavOpened() {
        this.matDrawer().toggle();
    }
}
