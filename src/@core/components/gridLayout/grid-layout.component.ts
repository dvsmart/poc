import { ViewEncapsulation, Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
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
    @Output() addNew: EventEmitter<any> = new EventEmitter();
    @Output() editRow: EventEmitter<any> = new EventEmitter();
    constructor(private _fuseSidebarService: FuseSidebarService
    )
    {
        
    }

    addNewClicked(){
        this.addNew.emit(true);
    }

    rowClicked($event){
        this.editRow.emit($event);
    }

    @Input() title:string;

    @Input() icon: string;

    @Input() ds: any;

    ngOnDestroy(): void {
    }
    ngOnInit(): void {
    }

    toggleSidebar(name: string): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}