import { Component, Input, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '../../animations';
import { Subject } from '../../../../node_modules/rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '../sidebar/sidebar.service';
import { CoreNavigationService } from './navigation.service';

@Component({
    selector: 'core-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CoreNavigationComponent {
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    private _unsubscribeAll: Subject<any>;
    
    constructor(private _navigationService: CoreNavigationService) {
        this._unsubscribeAll = new Subject();
        this._navigationService.getMenuItems();
    }

    ngOnInit(): void {
        this._navigationService.onMenuItemsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(menuItems => {
                if (menuItems) {
                    this.navigation = menuItems;
                }
            })
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}