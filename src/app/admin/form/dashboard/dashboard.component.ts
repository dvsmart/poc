import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '@core/components/sidebar/sidebar.service';
import { DashboardService } from './dashboard.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { FormsService } from './forms/forms.service';
import { fuseAnimations } from '@core/animations';
import { MatDialog } from '@angular/material';
import { CategoryComponent } from './category/category.component';
import { CategoryRequestModel } from './category/category';
import { FormComponent } from './form/form.component';
import { FormRequestModel } from './form/FormRequestModel';

@Component({
  selector: 'form-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DashboardComponent implements OnInit {
  categories: any;
  searchInput: FormControl;

  categoryName: string;
  private _unsubscribeAll: Subject<any>;
  constructor(private _fuseSidebarService: FuseSidebarService,
    private categoriesService: DashboardService,
    private _formsService: FormsService,
    private _dialog: MatDialog) {
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

  addNewCategory(): void {
    const dialogRef = this._dialog.open(CategoryComponent, {
      width: '400px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result!= "") {
        let categoryRequest = new CategoryRequestModel(result);
        this.categoriesService.saveCategory(categoryRequest);
      }
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
