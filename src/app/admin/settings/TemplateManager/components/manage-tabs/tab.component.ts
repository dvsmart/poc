import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@core/animations';
import { TabService } from './tab-detail/tab.service';
import { Router } from '@angular/router';


@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: fuseAnimations
})
export class TabComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  constructor() {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}


