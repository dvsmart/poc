import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { FuseSidebarService } from '@core/components/sidebar/sidebar.service';
 
import { takeUntil, debounceTime, distinctUntilChanged } from '../../../../node_modules/rxjs/operators';
import { fuseAnimations } from '@core/animations';
import { GenericList1 } from './genericlist1.model';
import { GenericList1Service } from './genericlist1.service';

@Component({
  selector: 'task',
  templateUrl: './genericlist1.component.html',
  styleUrls: ['./genericlist1.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class GenericList1Component implements OnInit {

  searchInput: FormControl;
  currentTask: GenericList1;
  isIndeterminate: boolean;
  filters: any[];
  tags: any[];

  private _unsubscribeAll: Subject<any>;
  hasSelectedTasks: boolean;
  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _taskservice: GenericList1Service
  ) {
    // Set the defaults
    this.searchInput = new FormControl('');

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._taskservice.onSelectedTasksChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(selectedTasks => {
        this.hasSelectedTasks = selectedTasks.length > 0;
      });

    this.searchInput.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        this._taskservice.onSearchTextChanged.next(searchText);
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  selectTasks(filterParameter?, filterValue?): void {
    this._taskservice.selectTasks(filterParameter, filterValue);
  }

  /**
   * Deselect todos
   */
  deselectTasks(): void {
    this._taskservice.deselectTasks();
  }

  /**
   * Toggle tag on selected todos
   *
   * @param tagId
   */
  toggleTagOnSelectedTodos(tagId): void {
    //this._taskservice.toggleTagOnSelectedTodos(tagId);
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  deselectCurrentTask() {

  }

  toggleSelectAll(): void {
    this._taskservice.toggleSelectAll();
  }

  selectTodos() {

  }
}
