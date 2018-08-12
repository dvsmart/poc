import { Component, OnInit } from '@angular/core';
import { FormControl } from '../../../../node_modules/@angular/forms';
import { Subject } from '../../../../node_modules/rxjs';
import { FuseSidebarService } from '@core/components/sidebar/sidebar.service';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { takeUntil, debounceTime, distinctUntilChanged } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  searchInput: FormControl;
  currentTask: Task;
  isIndeterminate: boolean;
  filters: any[];
  tags: any[];

  private _unsubscribeAll: Subject<any>;
  hasSelectedTasks: boolean;
  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _taskservice: TaskService
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
  selectTodos(filterParameter?, filterValue?): void {
    this._taskservice.selectTasks(filterParameter, filterValue);
  }

  /**
   * Deselect todos
   */
  deselectTodos(): void {
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

}
