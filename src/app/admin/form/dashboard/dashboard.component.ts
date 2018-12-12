import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '@core/components/sidebar/sidebar.service';
import { DashboardService } from './dashboard.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { FormsService } from './forms/forms.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  categories: any;
  searchInput: FormControl;
  private _unsubscribeAll: Subject<any>;
  constructor(private _fuseSidebarService: FuseSidebarService, private categoriesService: DashboardService, private _formsService: FormsService) {
    this.searchInput = new FormControl('');
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        this._formsService.onSearchFormTextChanged.next(searchText);
      });
  }

  ngAfterViewInit() {
    this.categories = this.categoriesService.getCategories();
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
