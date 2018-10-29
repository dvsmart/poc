import { Component, OnInit, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TabResponse } from '../../tab.model';
import { SetupService } from '../../../manage-templates/setup.service';

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
        private templateservice: SetupService,
        private _activatedRoute: ActivatedRoute
    ) {
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
