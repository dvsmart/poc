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
    constructor(private _propertyService: PropertiesService) {}

    ngOnInit(): void {

    }
}
