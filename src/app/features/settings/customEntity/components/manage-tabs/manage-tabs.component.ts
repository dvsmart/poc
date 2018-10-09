import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomentityService } from '../../service/customentity.service';
import { CustomTabResponse } from '../../models/customEntity.model';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-tabs',
  templateUrl: './manage-tabs.component.html',
  styleUrls: ['./manage-tabs.component.scss']
})
export class ManageTabsComponent implements OnInit {
  tabs: CustomTabResponse;
  private _unsubscribeAll: Subject<any>;
  selectedTabId: number | string;

  constructor(private _ceservice: CustomentityService, private route: ActivatedRoute) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.route.params.subscribe(x => {
      if (x["id"] != null || x["id"] != '') {
        this.selectedTabId = parseInt(x["id"]);
      }
    })
    this._ceservice.customTabs
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.tabs = response;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  changeTab(id) {
    this.selectedTabId = id;
    this._ceservice.getTabFields(id);
  }
}
