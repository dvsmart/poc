import { ViewEncapsulation, Component, OnInit, OnDestroy } from "@angular/core";
import { fuseAnimations } from "@core/animations";

@Component({
    selector: 'grid-layout',
    templateUrl: './grid-layout.component.html',
    styleUrls: ['./grid-layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class GridLayoutComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
    }
    ngOnInit(): void {
    }
}