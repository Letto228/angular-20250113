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
    // private readonly matDrawer = viewChild<MatDrawer>('drawer');
    // private readonly matDrawer = viewChild<MatDrawer>(MatDrawer);
    private readonly matDrawer = viewChild.required<MatDrawer>(MatDrawer);
    // private readonly divElement = viewChild<ElementRef<HTMLDivElement>>('divElement');
    // private readonly matDrawerElement = viewChild(MatDrawer, {read: ElementRef});
    private readonly navigationViewport = viewChild.required('navigationViewport', {
        read: ViewContainerRef,
    });

    private readonly contentViewport = viewChild.required('contentViewport', {
        read: ViewContainerRef,
    });

    // readonly isSidenavOpened = model(false);

    readonly navigationTemplate = input<TemplateRef<unknown>>();
    readonly contentTemplate = input<TemplateRef<unknown>>();

    constructor() {
        // console.log(this.matDrawer());

        // setTimeout(() => {
        //     const navigationTemplate = this.navigationTemplate();

        //     if (navigationTemplate) {
        //         // this.navigationViewport().createEmbeddedView(navigationTemplate, {
        //         //     contextProperty: 'Moscow',
        //         //     $implicit: 'Egor',
        //         // });
        //         // this.navigationViewport().createEmbeddedView(navigationTemplate, {
        //         //     contextProperty: 'Piter',
        //         //     $implicit: 'Alex',
        //         // });
        //         // this.navigationViewport().createEmbeddedView(navigationTemplate, {
        //         //     contextProperty: 'Sochi',
        //         //     $implicit: 'Katya',
        //         // });
        //         this.navigationViewport().createEmbeddedView(navigationTemplate, {
        //             contextProperty: 'Moscow',
        //             $implicit: 'Egor',
        //         });
        //     }

        //     const contentTemplate = this.contentTemplate();

        //     if (contentTemplate) {
        //         this.contentViewport().createEmbeddedView(contentTemplate);
        //     }
        // }, 1000);

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
        // this.isSidenavOpened.set(!this.isSidenavOpened());
        this.matDrawer().toggle();
        // this.matDrawer()?.openedChange.subscribe();

        // console.log(this.matDrawerElement());
    }
}
