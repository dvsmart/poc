import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '../../animations';
import { CoreNavigationService } from './navigation.service';
import { Subject } from '../../../../node_modules/rxjs';

@Component({
    selector     : 'core-navigation',
    templateUrl  : './navigation.component.html',
    styleUrls    : ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations:fuseAnimations
})
export class CoreNavigationComponent{
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private _fuseNavigationService: CoreNavigationService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Load the navigation either from the input or from the service
        //this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();

        this._fuseNavigationService.getMenu().subscribe(x => {
            this.navigation = x;
        });

        // Subscribe to the current navigation changes
        // this._fuseNavigationService.onNavigationChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(() => {
        //         this.navigation = this._fuseNavigationService.getCurrentNavigation();
        //     });
    }
}