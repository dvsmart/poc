import { ViewEncapsulation, Component, OnInit, OnDestroy, Input } from "@angular/core";
import { fuseAnimations } from "@core/animations";
import { FuseSidebarService } from "@core/components/sidebar/sidebar.service";

@Component({
    selector: 'grid-layout',
    templateUrl: './grid-layout.component.html',
    styleUrls: ['./grid-layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class GridLayoutComponent implements OnInit, OnDestroy {

    constructor(private _fuseSidebarService: FuseSidebarService
    )
    {
    }

    @Input() title:string;

    @Input() ds: any;

    ngOnDestroy(): void {
    }
    ngOnInit(): void {
    }

    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}