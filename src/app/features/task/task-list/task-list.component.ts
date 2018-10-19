import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { takeUntil } from '../../../../../node_modules/rxjs/operators';
import { DataSource } from '../../../../../node_modules/@angular/cdk/table';
import { TaskService } from '../task.service';
import { Observable, Subject } from '../../../../../node_modules/rxjs';
import { fuseAnimations } from '@core/animations';
import { Task } from '../task.model';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TaskListComponent implements OnInit {
  // @ViewChild('dialogContent')
  // dialogContent: TemplateRef<any>;
    resultsLength: number;
  // //tasks: any;
    pageSize = 10;
  // dataSource: TaskDataSource | null;
  // displayedColumns = ['checkbox', 'dataId','name', 'description', 'dueDate','status','priority', 'buttons'];
  // selectedTasks: any[];
  // checkboxes: {};
  // dialogRef: any;
  // confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  // Private
  private _unsubscribeAll: Subject<any>;
  currentPage: number;
  tasks: Task[];
  currentTask: Task;

  /**
   * Constructor
   *
   * @param {ContactsService} _contactsService
   * @param {MatDialog} _matDialog
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
        private _taskservice: TaskService,
        private _location: Location
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  pageEvent($event) {
    this.currentPage = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this._taskservice.gettasks(this.currentPage,this.pageSize);
  }
  /**
   * On init
   */
  ngOnInit(): void {
    this._taskservice.onTasksChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(todos => {
                this.tasks = todos.data;
                this.resultsLength = todos.totalCount;
                this.pageSize = todos.pageSize
                this.currentPage = todos.currentPage
            });

        // Subscribe to update current todo on changes
        this._taskservice.onCurrentTaskChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentTask => {
                if ( !currentTask )
                {
                    // Set the current todo id to null to deselect the current todo
                    this.currentTask = null;

                    // Handle the location changes
                    const tagHandle    = this._activatedRoute.snapshot.params.tagHandle,
                          filterHandle = this._activatedRoute.snapshot.params.filterHandle;

                    if ( tagHandle )
                    {
                        this._location.go('apps/todo/tag/' + tagHandle);
                    }
                    else if ( filterHandle )
                    {
                        this._location.go('apps/todo/filter/' + filterHandle);
                    }
                    else
                    {
                        this._location.go('apps/todo/all');
                    }
                }
                else
                {
                    this.currentTask = currentTask;
                }
            });
    //this.dataSource = new TaskDataSource(this._taskservice);



    // this._taskservice.onTasksChanged
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(result => {
    //     this.tasks = result;
    //     this.resultsLength = result;
    //     this.checkboxes = {};
    //     result.map(property => {
    //       this.checkboxes[property.id] = false;
    //     });
    //   });

    // this._taskservice.onSelectedTasksChanged
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(selectedtasks => {
    //     for (const id in this.checkboxes) {
    //       if (!this.checkboxes.hasOwnProperty(id)) {
    //         continue;
    //       }

    //       this.checkboxes[id] = selectedtasks.includes(id);
    //     }
    //     this.selectedTasks = selectedtasks;
    //   });

    // this._taskservice.onFilterChanged
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(() => {
    //     this._taskservice.deselectTasks();
    //   });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onDrop(ev): void
  {

  }

  readTask(taskId): void
  {
      // Set current todo
      this._taskservice.setCurrentTask(taskId);
  }

}

export class TaskDataSource extends DataSource<any>
{
  /**
   * Constructor
   *
   * @param {ContactsService} _contactsService
   */
  constructor(
    private _taskservice: TaskService
  ) {
    super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    return this._taskservice.onTasksChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }
}