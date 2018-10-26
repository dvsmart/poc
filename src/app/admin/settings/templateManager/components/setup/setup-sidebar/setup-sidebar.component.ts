import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'setup-sidebar',
  templateUrl: './setup-sidebar.component.html',
  styleUrls: ['./setup-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SetupSidebarComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  constructor() {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    
  }

}
