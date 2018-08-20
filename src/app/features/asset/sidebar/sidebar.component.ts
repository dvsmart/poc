import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../properties.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'properties-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    filterBy: string;
    
    private _unsubscribeAll: Subject<any>;
    constructor(private _propertyService: PropertiesService)
    {
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.filterBy = this._propertyService.filterBy || 'all';

        this._propertyService.onPropertiesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
            });
    }

    ngOnDestroy()
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    changeFilter(filter): void
    {
        this.filterBy = filter;
        this._propertyService.onFilterChanged.next(this.filterBy);
    }
}
