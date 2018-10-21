import { Component, OnInit, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TabService } from '../tabs.service';
import { TabResponse } from '../tab.model';



@Component({
    selector: 'tab-list-item',
    templateUrl: './tab-list-item.component.html',
    styleUrls: ['./tab-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TabListItemComponent implements OnInit {
    tags: any[];

    @Input()
    tab: TabResponse;

    @HostBinding('class.selected')
    selected: boolean;

    @HostBinding('class.completed')
    completed: boolean;

    @HostBinding('class.move-disabled')
    moveDisabled: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _tabService: TabService,
        private _activatedRoute: ActivatedRoute
    ) {
        // Disable move if path is not /all
        if (_activatedRoute.snapshot.url[0].path !== 'all') {
            this.moveDisabled = true;
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSelectedChange(): void {
        //this._taskService.toggleSelectedTask(this.task.id);
    }

}
