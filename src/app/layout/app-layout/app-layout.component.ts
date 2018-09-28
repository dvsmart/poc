import { Component, OnInit, ViewEncapsulation, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { FuseConfigService } from '@core/services/config.service';
import { MessageService } from '@core/services/message.service';
import { Subject } from 'rxjs';
import { ToasterComponent } from '../components/toaster/toaster.component';
import { takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '@core/components/sidebar/sidebar.service';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppLayoutComponent implements OnInit {
  config: any;
  private _unsubscribeAll: Subject<any>;
  @ViewChild('messagecontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(private _fuseConfigService: FuseConfigService,private menuservice: FuseSidebarService,
    private toaster: MessageService,
    private resolver: ComponentFactoryResolver) {
    this._unsubscribeAll = new Subject();
    this.menuservice.getMenuItems();
  }

  createComponent(message) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(ToasterComponent);
    const componentRef = this.entry.createComponent(factory);
    componentRef.instance.openSnackBar(message, 'Done');
  }

  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.config = config;
      });

    this.toaster.messageObserver.subscribe(x => {
      this.createComponent(x);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.entry.clear();
  }
}
