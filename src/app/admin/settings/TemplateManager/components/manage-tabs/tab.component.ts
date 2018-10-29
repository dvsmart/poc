import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@core/animations';
import { TabResponse } from './tab.model';
import { SetupService } from '../manage-templates/setup.service';


@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: fuseAnimations
})
export class TabComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;
  currentTab: TabResponse;
  isNew: boolean;
  templateId: number;
  constructor(private templateService: SetupService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
  }

  deselectCurrentTab(): void {
    this.currentTab = null
  }

  addTab() {
    this.templateService.setCurrentTab();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
