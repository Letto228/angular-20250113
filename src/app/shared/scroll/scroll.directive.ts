import {Directive, output} from '@angular/core';

@Directive({
    selector: '[appScroll]',
    standalone: true,
    host: {
        '(scroll)': 'onScroll($event)',
    },
})
export class ScrollDirective {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    private scrollTopSaved: number = 0;
    readonly scrollLoadNextData = output<Event>();

    onScroll(event: Event) {
        // eslint-disable-next-line prefer-const
        let scrollTopNew = (event.target as HTMLElement)?.scrollTop;
        const scrollHeight = (event.target as HTMLElement)?.scrollHeight;
        const clientHeight = (event.target as HTMLElement)?.clientHeight;

        // eslint-disable-next-line @stylistic/padding-line-between-statements, @typescript-eslint/no-unused-vars
        const scrollDownDirection: boolean | null =
            scrollTopNew - this.scrollTopSaved === 0
                ? null
                : scrollTopNew - this.scrollTopSaved > 0;

        // eslint-disable-next-line @stylistic/padding-line-between-statements
        this.scrollTopSaved = scrollTopNew;

        // eslint-disable-next-line no-console
        console.log('Scroll down', scrollDownDirection, scrollTopNew);

        if (scrollDownDirection && scrollHeight - clientHeight - scrollTopNew < 100) {
            // eslint-disable-next-line no-console
            // clientHeight 252 scrollHeight 1080 scrollTopNew 828
            // console.log(
            //     'clientHeight',
            //     clientHeight,
            //     'scrollHeight',
            //     scrollHeight,
            //     'scrollTopNew',
            //     scrollTopNew,
            // );
            // eslint-disable-next-line no-console
            console.log('Load new page');
            this.scrollLoadNextData.emit(event);
        }
    }
}
