import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@core/components/sidebar/sidebar.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-customobjectcontent',
  templateUrl: './customobjectcontent.component.html',
  styleUrls: ['./customobjectcontent.component.scss']
})
export class CustomobjectcontentComponent implements OnInit {

  constructor(private _coreSidebarService: FuseSidebarService) {
    this._unsubscribeAll = new Subject();
  }
  private _unsubscribeAll: Subject<any>;
  ngOnInit() {
    debugger;
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebar(name).toggleOpen();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
