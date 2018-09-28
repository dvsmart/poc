import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '../../animations';
import { CoreNavigationService } from './navigation.service';
import { Subject } from '../../../../node_modules/rxjs';
import { AuthService } from 'app/login/auth.service';
import { takeUntil } from 'rxjs/operators';

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
    constructor(private _fuseNavigationService: CoreNavigationService) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this._fuseNavigationService.getMenu()
            .subscribe(x => {
                this.navigation = x;
            })

        this._fuseNavigationService.onMenuItemsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(hasUpdated => {
                if(hasUpdated){
                    this._fuseNavigationService.getMenu()
                    .subscribe(x => {
                        this.navigation = x;
                    });
                }
            })
    }
}