import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { fuseAnimations } from '../../animations';
import { Subject, merge } from '../../../../node_modules/rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreNavigationService } from './navigation.service';

@Component({
    selector: 'core-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class CoreNavigationComponent {
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    private _unsubscribeAll: Subject<any>;

    constructor(private _navigationService: CoreNavigationService, private _changeDetectorRef: ChangeDetectorRef) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        //Subscribe to the current navigation changes
        this._navigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                // Load the navigation
                this.navigation = this._navigationService.getCurrentNavigation();
                console.log(this.navigation);
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // merge(
        //     this._navigationService.onNavigationItemAdded,
        //     this._navigationService.onNavigationItemUpdated,
        //     this._navigationService.onNavigationItemRemoved
        // ).pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(() => {
        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}