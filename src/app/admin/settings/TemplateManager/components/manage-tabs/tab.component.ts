import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TabService } from './tabs.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@core/animations';
import { TabResponse } from './tab.model';


@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TabComponent implements OnInit {
  
  private _unsubscribeAll: Subject<any>;
  currentTab: TabResponse;
  isNew: boolean;

  constructor(private _tabservice: TabService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    
  }

  deselectCurrentTodo(): void {
    this.currentTab = null
  }

  AddTab() {

  }

}
