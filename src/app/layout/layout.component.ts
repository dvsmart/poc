import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import { FuseConfigService } from '@core/services/config.service';
import { takeUntil } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'vertical-layout-1',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  config: any;
  private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService
    )
    {

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.config = config;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
