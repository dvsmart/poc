import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { Subject } from 'rxjs';
import { SetupService } from '../../setup.service';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Location } from '@angular/common';

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
  id: number;
  tabs: any;
  constructor(private templateservice: SetupService, private router: Router) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.templateservice.customTabs
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(res => {
        this.id = res.id;
        this.templateName = res.templateName;
        this.tabs = res.templateTabs;
      })
  }
  selectChange(e) {
    if (e.tab.isActive && e.tab.textLabel === 'Main') {
      this.router.navigate(['admin/customObject/templateManagement/', this.id, '/details']);
    }
  }



  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
