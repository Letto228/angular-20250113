import {CommonModule, NgFor} from '@angular/common';
import {ChangeDetectionStrategy, Component, input, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {Data} from '@angular/router';

@Component({
    selector: 'app-my-paginator',
    standalone: true,
    imports: [MatIcon, CommonModule, NgFor],
    templateUrl: './my-paginator.component.html',
    styleUrl: './my-paginator.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyPaginatorComponent {
    readonly selectedIndex = signal(0);

    readonly items = input<Data[] | null>();
    readonly itemsPerPage = input.required<number>();
    readonly index = input.required<number>();
    readonly select = input.required<(index: number) => void>();
    readonly pageNumbers = input.required<number[]>();
    readonly next = input.required<() => void>();
    readonly back = input.required<() => void>();

    // readonly pageNumbers = computed<number[]>(() => {
    //     const pageCount = this.getPageCount();

    //     return Array.from({length: pageCount}, (_, i) => i + 1);
    // });

    // getPageCount() {
    //     return Math.ceil((this.items()?.length ?? 0) / this.itemsPerPage());
    // }

    // select(index: number) {
    //     const count: number = this.getPageCount();

    //     if (index >= 0 && index < count) {
    //         this.selectedIndex.set(index);
    //     }
    // }

    // next() {
    //     const nextIndex = this.selectedIndex() + 1;
    //     const itemsLength = this.getPageCount();

    //     const newIndex = nextIndex < itemsLength ? nextIndex : 0;

    //     this.selectedIndex.set(newIndex);
    // }

    // back() {
    //     const prevIndex = this.selectedIndex() - 1;
    //     const itemsLength = this.getPageCount();

    //     const newIndex = prevIndex >= 0 ? prevIndex : itemsLength - 1;

    //     this.selectedIndex.set(newIndex);
    // }
}
