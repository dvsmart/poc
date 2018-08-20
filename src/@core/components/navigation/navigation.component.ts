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

    constructor(private _fuseNavigationService: CoreNavigationService){}

    ngOnInit(): void
    {
        this._fuseNavigationService.getMenu().subscribe(x => {
            this.navigation = x;
        });
    }
}