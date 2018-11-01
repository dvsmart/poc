import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@core/animations';
import { TabRequest } from './tab.model';
import { SetupService } from '../manage-templates/setup.service';
import { TabService } from './tab-detail/tab.service';


@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: fuseAnimations
})
export class TabComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;
  currentTab: TabRequest;
  isNew: boolean;
  tabId: number;
  constructor(private tabservice: TabService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
  }

  deselectCurrentTab(): void {
    this.currentTab = null
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
