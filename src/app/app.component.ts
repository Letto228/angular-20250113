import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    inject,
    signal,
} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {ProductsListComponent} from './pages/products-list/products-list.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeaderComponent, ProductsListComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    // private count = 0;
    private readonly count = signal(0, {equal: (a, b) => a === b});
    private readonly doubleCount = computed(() => this.count() * 2);

    private readonly changeDetectorRef = inject(ChangeDetectorRef);

    // eslint-disable-next-line max-statements
    constructor() {
        // setInterval(() => {
        //     // this.count += 1;

        //     // this.changeDetectorRef.markForCheck();

        //     // const countValue = this.count();
        //     // const newCountValue = countValue + 1;

        //     // this.count.set(newCountValue);

        //     this.count.update(count => count + 1);

        //     // this.changeDetectorRef.markForCheck();
        // }, 1000);

        const showCount = signal(false);
        const count = signal(0);
        const conditionalCount = computed(() => {
            console.warn('Computed calculated');

            return showCount() ? `The count: ${count()}` : `Nothing`;
        });

        // eslint-disable-next-line no-console
        console.log(conditionalCount());
        // eslint-disable-next-line no-console
        console.log(conditionalCount());
        // eslint-disable-next-line no-console
        console.log(conditionalCount());

        // eslint-disable-next-line no-console
        console.log('Update count');
        count.update(count => count + 1);

        // eslint-disable-next-line no-console
        console.log(conditionalCount());

        // eslint-disable-next-line no-console
        console.log('Update count');
        count.update(count => count + 1);

        // eslint-disable-next-line no-console
        console.log(conditionalCount());

        // eslint-disable-next-line no-console
        console.log('Update count');
        count.update(count => count + 1);

        // eslint-disable-next-line no-console
        console.log(conditionalCount());

        // eslint-disable-next-line no-console
        console.log('Show count: true');
        showCount.set(true);

        // eslint-disable-next-line no-console
        console.log(conditionalCount());
        // eslint-disable-next-line no-console
        console.log(conditionalCount());
        // eslint-disable-next-line no-console
        console.log(conditionalCount());

        // eslint-disable-next-line no-console
        console.log('Update count');
        count.update(count => count + 1);

        // eslint-disable-next-line no-console
        console.log(conditionalCount());

        // eslint-disable-next-line no-console
        console.log('Update count');
        count.update(count => count + 1);

        // eslint-disable-next-line no-console
        console.log(conditionalCount());

        // eslint-disable-next-line no-console
        console.log('Update count');
        count.update(count => count + 1);

        // eslint-disable-next-line no-console
        console.log(conditionalCount());
    }

    getCount(): number {
        // eslint-disable-next-line no-console
        console.log('Calculated');

        // return this.count;
        return this.count();
    }
}
