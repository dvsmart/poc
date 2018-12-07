import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '@core/components/sidebar/sidebar.service';
import { DashboardService } from './dashboard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  categories: any;
  constructor(private _fuseSidebarService: FuseSidebarService, private categoriesService: DashboardService) {
    this._unsubscribeAll = new Subject();
   }

  ngOnInit() {
    this.categoriesService.onCategoriesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        this.categories = response;
      })
  }

  toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
