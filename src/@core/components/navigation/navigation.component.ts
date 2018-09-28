import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '../../animations';
import { CoreNavigationService } from './navigation.service';
import { Subject } from '../../../../node_modules/rxjs';
import { AuthService } from 'app/login/auth.service';
import { takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '../sidebar/sidebar.service';

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
    constructor(private _navigationService: FuseSidebarService) {
        this._unsubscribeAll = new Subject();
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
}