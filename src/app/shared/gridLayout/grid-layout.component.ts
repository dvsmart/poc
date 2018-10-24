import { ViewEncapsulation, Component, OnInit, OnDestroy, Input } from "@angular/core";
import { fuseAnimations } from "@core/animations";
import { MatTableDataSource } from "@angular/material";

@Component({
    selector: 'grid-layout',
    templateUrl: './grid-layout.component.html',
    styleUrls: ['./grid-layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class GridLayoutComponent implements OnInit, OnDestroy {

    @Input() title:string;

    @Input() ds: any;

    ngOnDestroy(): void {
    }
    ngOnInit(): void {
    }
}