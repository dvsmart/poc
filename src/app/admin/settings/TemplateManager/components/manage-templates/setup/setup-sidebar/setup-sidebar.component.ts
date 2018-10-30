import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { Subject } from 'rxjs';
import { SetupService } from '../../setup.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'setup-sidebar',
  templateUrl: './setup-sidebar.component.html',
  styleUrls: ['./setup-sidebar.component.scss'],
  //encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SetupSidebarComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  templateName: any;
  tabs: any;
  constructor(private templateservice: SetupService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.templateservice.customTabs
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        this.templateName = res.templateName
        this.tabs = res.templateTabs;
      })
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}