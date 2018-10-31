import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { Subject } from 'rxjs';
import { SetupService } from '../../manage-templates/setup.service';
import { takeUntil } from 'rxjs/operators';
import { TabService } from '../tab-detail/tab.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  animations: fuseAnimations
})
export class TabsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  tabs: any;
  templateId:number;
  constructor(private templateservice: SetupService,private tabservice:TabService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.templateservice.customTabs
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        this.templateId = res.id;
        this.tabs = res.templateTabs;
      })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
