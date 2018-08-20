import { Component, OnInit, ViewEncapsulation, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';
import { FuseConfigService } from '@core/services/config.service';
import { takeUntil } from '../../../node_modules/rxjs/operators';
import { MessageService } from '@core/services/message.service';
import { ToasterComponent } from './components/toaster/toaster.component';

@Component({
  selector: 'vertical-layout-1',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  config: any;
  private _unsubscribeAll: Subject<any>;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private toaster: MessageService,
        private resolver: ComponentFactoryResolver
    )
    {

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    createComponent(message) {
        this.entry.clear();
        const factory = this.resolver.resolveComponentFactory(ToasterComponent);
        const componentRef = this.entry.createComponent(factory);
        componentRef.instance.openSnackBar(message,'Done');
    }

    ngOnInit(): void
    {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.config = config;
            });

        this.toaster.messageObserver.subscribe(x=>{
            debugger;
            this.createComponent(x);
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
