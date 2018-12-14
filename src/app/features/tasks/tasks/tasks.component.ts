import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@core/animations';
import { TasksService } from './tasks.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { source, Column } from '@core/components/data-table/dataTableSource';
import { Router } from '@angular/router';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: fuseAnimations,
})
export class TasksComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;

  tableDataSource: source;

  constructor(private _tasksService: TasksService, private router: Router) {
    this._unsubscribeAll = new Subject();
  }



  columns: Column[] = [{ name: 'name', title: 'Name', type: 'string' }, { type: 'string', name: 'description', title: 'Description' }, { type: 'string', title: 'Status', name: 'status' },
  { title: 'Priority', name: 'priority', type: 'string' }, { type: 'bool', title: 'Is Completed', name: 'isCompleted' }, { type: 'date', title: 'Created On', name: 'createdOn', options: { dateFormat: 'shortDate' } },
  { title: 'Created By', name: 'addedBy', type: 'string' }];

  ngOnInit() {
    this._tasksService.tasks
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(response => {
        if (response) {
          this.tableDataSource = new source(response);
        }
      });
  }

  onAddNewTask($event) {
    this.router.navigate(['task/new']);
  }

  rowClicked($event: any) {
    this.router.navigate(['task/' + $event.id]);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}