import { Component, OnInit, ViewEncapsulation, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { FuseConfigService } from '@core/services/config.service';
import { MessageService } from '@core/services/message.service';
import { Subject } from 'rxjs';
import { ToasterComponent } from '../components/toaster/toaster.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SiteLayoutComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;

  constructor() {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
