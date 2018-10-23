import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Subject } from 'rxjs';

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
