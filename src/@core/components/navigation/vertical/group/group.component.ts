import { Component, HostBinding, Input } from '@angular/core';


@Component({
    selector   : 'fuse-nav-vertical-group',
    templateUrl: './group.component.html',
    styleUrls  : ['./group.component.scss']
})
export class CoreNavVerticalGroupComponent
{
    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input()
    item: any;

    /**
     * Constructor
     */
    constructor()
    {
    }

}
