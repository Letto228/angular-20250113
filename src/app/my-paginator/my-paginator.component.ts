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
}
